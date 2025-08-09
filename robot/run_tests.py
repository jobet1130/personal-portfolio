#!/usr/bin/env python3
"""
Robot Framework Test Runner for Portfolio Website

This script provides a convenient way to run Robot Framework tests
with different configurations and generate comprehensive reports.
"""

import os
import sys
import argparse
import subprocess
from pathlib import Path
from datetime import datetime

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

class RobotTestRunner:
    def __init__(self):
        self.robot_dir = Path(__file__).parent
        self.tests_dir = self.robot_dir / "tests"
        self.resources_dir = self.robot_dir / "resources"
        self.reports_dir = self.robot_dir / "reports"
        
        # Create reports directory if it doesn't exist
        self.reports_dir.mkdir(exist_ok=True)
        
    def run_tests(self, test_suite=None, tags=None, browser="chrome", headless=True, 
                  include_tags=None, exclude_tags=None, variables=None):
        """
        Run Robot Framework tests with specified parameters
        """
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Base robot command
        cmd = [
            "robot",
            "--outputdir", str(self.reports_dir),
            "--output", f"output_{timestamp}.xml",
            "--log", f"log_{timestamp}.html",
            "--report", f"report_{timestamp}.html",
            "--variable", f"BROWSER:{browser}",
            "--variable", f"HEADLESS:{headless}"
        ]
        
        # Add custom variables
        if variables:
            for var in variables:
                cmd.extend(["--variable", var])
        
        # Add tag filters
        if include_tags:
            for tag in include_tags:
                cmd.extend(["--include", tag])
                
        if exclude_tags:
            for tag in exclude_tags:
                cmd.extend(["--exclude", tag])
        
        # Add test suite or default to all tests
        if test_suite:
            test_path = self.tests_dir / f"{test_suite}.robot"
            if not test_path.exists():
                print(f"Error: Test suite {test_suite}.robot not found")
                return False
            cmd.append(str(test_path))
        else:
            cmd.append(str(self.tests_dir))
        
        print(f"Running command: {' '.join(cmd)}")
        
        try:
            result = subprocess.run(cmd, cwd=self.robot_dir, capture_output=True, text=True)
            
            print("\n" + "="*50)
            print("ROBOT FRAMEWORK TEST RESULTS")
            print("="*50)
            print(result.stdout)
            
            if result.stderr:
                print("\nErrors:")
                print(result.stderr)
            
            print(f"\nReports generated in: {self.reports_dir}")
            print(f"- Log: log_{timestamp}.html")
            print(f"- Report: report_{timestamp}.html")
            
            return result.returncode == 0
            
        except FileNotFoundError:
            print("Error: Robot Framework not found. Please install it with:")
            print("pip install robotframework robotframework-seleniumlibrary")
            return False
        except Exception as e:
            print(f"Error running tests: {e}")
            return False
    
    def list_test_suites(self):
        """
        List available test suites
        """
        print("Available test suites:")
        for robot_file in self.tests_dir.glob("*.robot"):
            print(f"  - {robot_file.stem}")
    
    def install_dependencies(self):
        """
        Install required dependencies
        """
        requirements_file = self.robot_dir / "requirements.txt"
        if requirements_file.exists():
            print("Installing dependencies...")
            subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(requirements_file)])
        else:
            print("Installing basic Robot Framework dependencies...")
            subprocess.run([sys.executable, "-m", "pip", "install", 
                          "robotframework", "robotframework-seleniumlibrary", 
                          "selenium", "webdriver-manager"])

def main():
    parser = argparse.ArgumentParser(description="Run Robot Framework tests for portfolio website")
    
    parser.add_argument("--suite", "-s", help="Specific test suite to run (without .robot extension)")
    parser.add_argument("--browser", "-b", default="chrome", 
                       choices=["chrome", "firefox", "edge", "safari"],
                       help="Browser to use for testing")
    parser.add_argument("--headless", action="store_true", default=True,
                       help="Run browser in headless mode")
    parser.add_argument("--headed", action="store_true", 
                       help="Run browser in headed mode (opposite of headless)")
    parser.add_argument("--include", "-i", action="append", 
                       help="Include tests with specific tags")
    parser.add_argument("--exclude", "-e", action="append",
                       help="Exclude tests with specific tags")
    parser.add_argument("--variable", "-v", action="append",
                       help="Set variable for test execution (format: NAME:VALUE)")
    parser.add_argument("--list", "-l", action="store_true",
                       help="List available test suites")
    parser.add_argument("--install", action="store_true",
                       help="Install required dependencies")
    parser.add_argument("--url", default="http://localhost:5173",
                       help="Base URL for testing (default: http://localhost:5173)")
    
    args = parser.parse_args()
    
    runner = RobotTestRunner()
    
    if args.install:
        runner.install_dependencies()
        return
    
    if args.list:
        runner.list_test_suites()
        return
    
    # Handle headed/headless mode
    headless = args.headless and not args.headed
    
    # Add base URL as variable
    variables = args.variable or []
    variables.append(f"BASE_URL:{args.url}")
    
    success = runner.run_tests(
        test_suite=args.suite,
        browser=args.browser,
        headless=headless,
        include_tags=args.include,
        exclude_tags=args.exclude,
        variables=variables
    )
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()