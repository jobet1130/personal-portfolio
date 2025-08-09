*** Settings ***
Documentation     Component-specific tests for portfolio website
Resource          ../resources/common.robot
Suite Setup       Setup Browser
Suite Teardown    Teardown Browser

*** Test Cases ***
Hero Component Functionality
    [Documentation]    Test hero section component behavior
    [Tags]    component    hero
    Element Should Be Visible    ${HERO_SECTION}
    Element Should Be Visible    css:.hero-title
    Element Should Be Visible    css:.hero-subtitle
    Element Should Be Visible    css:.hero-cta
    Click Element    css:.hero-cta
    Wait Until Element Is Visible    ${PROJECTS_SECTION}    timeout=${TIMEOUT}

Navbar Component Behavior
    [Documentation]    Test navigation bar component
    [Tags]    component    navbar
    Element Should Be Visible    ${NAVBAR}
    Element Should Be Visible    css:.navbar-brand
    Element Should Be Visible    css:.navbar-menu
    
    # Test mobile menu toggle
    Set Window Size    375    667
    Element Should Be Visible    css:.navbar-toggle
    Click Element    css:.navbar-toggle
    Element Should Be Visible    css:.navbar-menu.is-active
    
    # Reset to desktop
    Set Window Size    1920    1080

Projects Component Grid
    [Documentation]    Test projects grid component
    [Tags]    component    projects
    Scroll To Element    ${PROJECTS_SECTION}
    Element Should Be Visible    ${PROJECTS_SECTION}
    
    ${project_cards}=    Get WebElements    css:.project-card
    Should Not Be Empty    ${project_cards}
    
    # Test project card interaction
    Click Element    css:.project-card:first-child
    Element Should Be Visible    css:.project-modal
    Click Element    css:.modal-close
    Element Should Not Be Visible    css:.project-modal

Skills Component Tags
    [Documentation]    Test skills component with technology tags
    [Tags]    component    skills
    Scroll To Element    ${SKILLS_SECTION}
    Element Should Be Visible    ${SKILLS_SECTION}
    
    ${skill_tags}=    Get WebElements    css:.skill-tag
    Should Not Be Empty    ${skill_tags}
    
    # Verify skill categories
    Element Should Be Visible    css:.skills-category[data-category="frontend"]
    Element Should Be Visible    css:.skills-category[data-category="backend"]
    Element Should Be Visible    css:.skills-category[data-category="tools"]

Timeline Component Items
    [Documentation]    Test timeline component functionality
    [Tags]    component    timeline
    Scroll To Element    ${TIMELINE_SECTION}
    Element Should Be Visible    ${TIMELINE_SECTION}
    
    ${timeline_items}=    Get WebElements    css:.timeline-item
    Should Not Be Empty    ${timeline_items}
    
    # Test timeline item expansion
    Click Element    css:.timeline-item:first-child .timeline-header
    Element Should Be Visible    css:.timeline-item:first-child .timeline-content.expanded

Values Component Cards
    [Documentation]    Test values component with value cards
    [Tags]    component    values
    Scroll To Element    ${VALUES_SECTION}
    Element Should Be Visible    ${VALUES_SECTION}
    
    Verify Element Count    css:.value-card    6
    
    # Test each value card
    FOR    ${index}    IN RANGE    1    7
        Element Should Be Visible    css:.value-card:nth-child(${index}) .value-icon
        Element Should Be Visible    css:.value-card:nth-child(${index}) .value-title
        Element Should Be Visible    css:.value-card:nth-child(${index}) .value-description
    END

Personal Interests Component
    [Documentation]    Test personal interests component
    [Tags]    component    interests
    Scroll To Element    ${INTERESTS_SECTION}
    Element Should Be Visible    ${INTERESTS_SECTION}
    
    Element Should Be Visible    css:.interests-grid
    Element Should Be Visible    css:.fun-facts
    
    ${interest_cards}=    Get WebElements    css:.interest-card
    Should Not Be Empty    ${interest_cards}
    
    ${fun_facts}=    Get WebElements    css:.fact-item
    Should Not Be Empty    ${fun_facts}

Contact Form Component
    [Documentation]    Test contact form component functionality
    [Tags]    component    contact
    Scroll To Element    ${CONTACT_SECTION}
    Element Should Be Visible    ${CONTACT_SECTION}
    
    # Test form fields
    Element Should Be Visible    css:input[name="name"]
    Element Should Be Visible    css:input[name="email"]
    Element Should Be Visible    css:textarea[name="message"]
    Element Should Be Visible    css:button[type="submit"]
    
    # Test form validation
    Fill Contact Form    name=    email=invalid    message=
    Click Element    css:button[type="submit"]
    Element Should Be Visible    css:.form-errors
    
    # Test successful form fill
    Fill Contact Form
    Element Should Be Enabled    css:button[type="submit"]

Footer Component Links
    [Documentation]    Test footer component and social links
    [Tags]    component    footer
    Scroll To Element    ${FOOTER}
    Element Should Be Visible    ${FOOTER}
    
    Element Should Be Visible    css:.footer-content
    Element Should Be Visible    css:.social-links
    
    ${social_links}=    Get WebElements    css:.social-links a
    Should Not Be Empty    ${social_links}
    
    # Verify social links have proper attributes
    FOR    ${link}    IN    @{social_links}
        Element Should Have Attribute    ${link}    href
        Element Should Have Attribute    ${link}    target    _blank
    END