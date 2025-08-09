*** Settings ***
Documentation     Portfolio Website Test Suite
Library           SeleniumLibrary
Library           Collections
Suite Setup       Open Browser To Portfolio
Suite Teardown    Close Browser

*** Variables ***
${URL}            http://localhost:5173
${BROWSER}        Chrome
${DELAY}          0.5

*** Test Cases ***
Portfolio Homepage Should Load
    [Documentation]    Verify that the portfolio homepage loads correctly
    [Tags]    smoke
    Page Should Contain Element    css:.hero
    Page Should Contain Element    css:.navbar
    Page Should Contain Element    css:.footer
    Title Should Be    Personal Portfolio

Navigation Menu Should Work
    [Documentation]    Test navigation menu functionality
    [Tags]    navigation
    Click Element    css:a[href="/about"]
    Wait Until Location Contains    /about    timeout=10s
    Go Back
    
    Click Element    css:a[href="/projects"]
    Wait Until Location Contains    /projects    timeout=10s
    Go Back
    
    Click Element    css:a[href="/"]
    Wait Until Location Contains    /    timeout=10s

Hero Section Should Display Correctly
    [Documentation]    Verify hero section content and styling
    [Tags]    hero
    Element Should Be Visible    css:.hero
    Element Should Contain    css:.hero-title    Welcome
    Element Should Be Visible    css:.hero-subtitle
    Element Should Be Visible    css:.hero-cta

Projects Section Should Show Projects
    [Documentation]    Test projects section functionality
    [Tags]    projects
    Scroll Element Into View    css:.projects
    Element Should Be Visible    css:.projects
    Element Should Be Visible    css:.project-card
    ${project_count}=    Get Element Count    css:.project-card
    Should Be True    ${project_count} > 0

Contact Form Should Be Functional
    [Documentation]    Test contact form validation and submission
    [Tags]    contact
    Scroll Element Into View    css:.contact-form
    Input Text    css:input[name="name"]    Test User
    Input Text    css:input[name="email"]    test@example.com
    Input Text    css:textarea[name="message"]    This is a test message
    Element Should Be Enabled    css:button[type="submit"]

Skills Section Should Display Technologies
    [Documentation]    Verify skills section shows technology stack
    [Tags]    skills
    Scroll Element Into View    css:.skills
    Element Should Be Visible    css:.skills
    Element Should Be Visible    css:.skill-tag
    ${skills_count}=    Get Element Count    css:.skill-tag
    Should Be True    ${skills_count} > 0

Timeline Should Show Experience
    [Documentation]    Test timeline component functionality
    [Tags]    timeline
    Scroll Element Into View    css:.timeline
    Element Should Be Visible    css:.timeline
    Element Should Be Visible    css:.timeline-item
    ${timeline_items}=    Get Element Count    css:.timeline-item
    Should Be True    ${timeline_items} > 0

Values Section Should Be Present
    [Documentation]    Verify core values section displays correctly
    [Tags]    values
    Scroll Element Into View    css:.values
    Element Should Be Visible    css:.values
    Element Should Be Visible    css:.value-card
    ${values_count}=    Get Element Count    css:.value-card
    Should Be Equal As Numbers    ${values_count}    6

Personal Interests Should Be Displayed
    [Documentation]    Test personal interests section
    [Tags]    interests
    Scroll Element Into View    css:.personal-interests
    Element Should Be Visible    css:.personal-interests
    Element Should Be Visible    css:.interest-card
    Element Should Be Visible    css:.fun-facts

Responsive Design Should Work
    [Documentation]    Test responsive design on different screen sizes
    [Tags]    responsive
    Set Window Size    1920    1080
    Element Should Be Visible    css:.navbar
    Set Window Size    768    1024
    Element Should Be Visible    css:.navbar
    Set Window Size    375    667
    Element Should Be Visible    css:.navbar

*** Keywords ***
Open Browser To Portfolio
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Wait Until Page Contains Element    css:.hero    timeout=10s

Scroll Element Into View
    [Arguments]    ${locator}
    Execute Javascript    document.querySelector('${locator}').scrollIntoView({behavior: 'smooth', block: 'center'});
    Sleep    1s