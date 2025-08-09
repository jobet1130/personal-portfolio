# Robot Framework Test Suite for Portfolio Website

This directory contains a comprehensive Robot Framework test suite for the personal portfolio website. The tests cover functionality, accessibility, performance, and component-specific behaviors.

## 📁 Directory Structure

```
robot/
├── tests/
│   ├── portfolio.robot      # Main functionality tests
│   ├── components.robot     # Component-specific tests
│   ├── accessibility.robot  # Accessibility compliance tests
│   └── performance.robot    # Performance and optimization tests
├── resources/
│   └── common.robot         # Shared keywords and variables
├── reports/                 # Generated test reports (created automatically)
├── requirements.txt         # Python dependencies
├── run_tests.py            # Test runner script
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install Python dependencies
python run_tests.py --install

# Or manually install
pip install -r requirements.txt
```

### 2. Start the Development Server

Make sure your portfolio website is running locally:

```bash
# In the main project directory
npm run dev
```

The default URL is `http://localhost:5173`

### 3. Run Tests

```bash
# Run all tests
python run_tests.py

# Run specific test suite
python run_tests.py --suite portfolio
python run_tests.py --suite components
python run_tests.py --suite accessibility
python run_tests.py --suite performance

# Run with specific browser
python run_tests.py --browser firefox
python run_tests.py --browser edge

# Run in headed mode (see browser)
python run_tests.py --headed

# Run with specific tags
python run_tests.py --include component
python run_tests.py --exclude performance

# Run with custom URL
python run_tests.py --url http://localhost:3000
```

## 📋 Test Suites

### 1. Portfolio Tests (`portfolio.robot`)
Main functionality tests covering:
- Homepage loading and navigation
- Hero section display
- Projects section functionality
- Contact form behavior
- Skills and timeline sections
- Values and personal interests
- Responsive design
- Cross-browser compatibility

### 2. Component Tests (`components.robot`)
Component-specific behavior tests:
- Hero component functionality
- Navbar behavior and mobile menu
- Projects grid and modal interactions
- Skills component with technology tags
- Timeline component expansion
- Values component cards
- Personal interests display
- Contact form validation
- Footer and social links

### 3. Accessibility Tests (`accessibility.robot`)
Accessibility compliance tests:
- Document structure validation
- Heading hierarchy verification
- Image alt text checks
- Form label associations
- Keyboard navigation
- ARIA roles and attributes
- Color contrast basics
- Screen reader compatibility
- Focus indicators
- Error message accessibility

### 4. Performance Tests (`performance.robot`)
Performance and optimization tests:
- Page load time measurement
- Image optimization checks
- CSS/JS minification verification
- Console error detection
- Font loading efficiency
- Lazy loading implementation
- Resource hints presence
- Render-blocking resource detection
- Animation performance
- Memory usage monitoring

## 🏷️ Test Tags

Tests are organized with tags for selective execution:

- `component` - Component-specific tests
- `accessibility` - Accessibility tests
- `performance` - Performance tests
- `responsive` - Responsive design tests
- `navigation` - Navigation-related tests
- `forms` - Form functionality tests
- `hero`, `projects`, `skills`, `timeline`, `values`, `interests`, `contact` - Section-specific tests

## 📊 Test Reports

After running tests, reports are generated in the `reports/` directory:

- `log_YYYYMMDD_HHMMSS.html` - Detailed test execution log
- `report_YYYYMMDD_HHMMSS.html` - Summary report with statistics
- `output_YYYYMMDD_HHMMSS.xml` - Raw test results in XML format

## 🔧 Configuration

### Environment Variables

You can customize test execution with variables:

```bash
# Custom base URL
python run_tests.py --variable BASE_URL:http://localhost:3000

# Custom browser settings
python run_tests.py --variable BROWSER:firefox --variable HEADLESS:false

# Custom timeouts
python run_tests.py --variable TIMEOUT:10 --variable DELAY:1
```

### Browser Configuration

Supported browsers:
- Chrome (default)
- Firefox
- Edge
- Safari (macOS only)

### Common Keywords

The `common.robot` resource file provides reusable keywords:

- `Setup Browser` / `Teardown Browser` - Browser lifecycle management
- `Navigate To Section` - Smooth scrolling to page sections
- `Verify Element Count` - Count validation
- `Fill Contact Form` - Form interaction helper
- `Check Accessibility` - Basic accessibility checks
- `Verify Animation` - Animation testing helper

## 🐛 Troubleshooting

### Common Issues

1. **WebDriver Issues**
   ```bash
   # Update webdriver
   pip install --upgrade selenium webdriver-manager
   ```

2. **Port Conflicts**
   ```bash
   # Use different port
   python run_tests.py --url http://localhost:3000
   ```

3. **Browser Not Found**
   ```bash
   # Install browser or use different one
   python run_tests.py --browser firefox
   ```

4. **Timeout Issues**
   ```bash
   # Increase timeout
   python run_tests.py --variable TIMEOUT:15
   ```

### Debug Mode

For debugging failed tests:

```bash
# Run in headed mode with delays
python run_tests.py --headed --variable DELAY:2

# Run specific failing test
python run_tests.py --suite accessibility --include forms
```

## 📈 Continuous Integration

For CI/CD integration, use headless mode:

```bash
# CI-friendly command
python run_tests.py --headless --variable TIMEOUT:30
```

### GitHub Actions Example

```yaml
- name: Run Robot Framework Tests
  run: |
    cd robot
    python run_tests.py --headless --browser chrome
```

## 🤝 Contributing

When adding new tests:

1. Follow the existing naming conventions
2. Add appropriate tags for categorization
3. Use descriptive test names and documentation
4. Leverage common keywords from `common.robot`
5. Update this README if adding new test suites

## 📚 Resources

- [Robot Framework Documentation](https://robotframework.org/robotframework/)
- [SeleniumLibrary Documentation](https://robotframework.org/SeleniumLibrary/)
- [Robot Framework User Guide](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)
- [Web Testing Best Practices](https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html#Best%20practices)