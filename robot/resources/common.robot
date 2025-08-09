*** Settings ***
Documentation     Common keywords and variables for portfolio tests
Library           SeleniumLibrary
Library           Collections
Library           String

*** Variables ***
${BASE_URL}       http://localhost:5173
${BROWSER}        Chrome
${TIMEOUT}        10s
${DELAY}          0.5s

# Page selectors
${NAVBAR}                css:.header
${HERO_SECTION}          css:.hero
${PROJECTS_SECTION}      css:.projects
${SKILLS_SECTION}        css:.skills
${TIMELINE_SECTION}      css:.timeline
${VALUES_SECTION}        css:.values
${INTERESTS_SECTION}     css:.interests
${CONTACT_SECTION}       css:.contact
${FOOTER}                css:.footer

*** Keywords ***
Setup Browser
    [Documentation]    Initialize browser for testing
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Wait Until Page Contains Element    ${HERO_SECTION}    timeout=${TIMEOUT}

Teardown Browser
    [Documentation]    Close browser after testing
    Close Browser

Navigate To Section
    [Documentation]    Navigate to a specific section of the portfolio
    [Arguments]    ${section_name}
    ${section_link}=    Set Variable    css:a[href="#${section_name}"]
    Click Element    ${section_link}
    Wait Until Element Is Visible    css:.${section_name}    timeout=${TIMEOUT}

Scroll To Element
    [Documentation]    Scroll to an element smoothly
    [Arguments]    ${locator}
    Execute Javascript    document.querySelector('${locator}').scrollIntoView({behavior: 'smooth', block: 'center'});
    Sleep    1s

Verify Element Count
    [Documentation]    Verify that an element appears a specific number of times
    [Arguments]    ${locator}    ${expected_count}
    ${actual_count}=    Get Element Count    ${locator}
    Should Be Equal As Numbers    ${actual_count}    ${expected_count}

Verify Element Contains Text
    [Documentation]    Verify that an element contains specific text
    [Arguments]    ${locator}    ${expected_text}
    Element Should Contain    ${locator}    ${expected_text}

Verify Page Responsiveness
    [Documentation]    Test page responsiveness across different screen sizes
    [Arguments]    @{screen_sizes}
    FOR    ${size}    IN    @{screen_sizes}
        ${width}=    Get From List    ${size}    0
        ${height}=    Get From List    ${size}    1
        Set Window Size    ${width}    ${height}
        Sleep    1s
        Element Should Be Visible    css:.nav-brand
        Element Should Be Visible    css:.nav-links
    END

Fill Contact Form
    [Documentation]    Fill out the contact form with test data
    [Arguments]    ${name}=Test User    ${email}=test@example.com    ${message}=Test message
    Scroll To Element    ${CONTACT_SECTION}
    Input Text    css:input[name="name"]    ${name}
    Input Text    css:input[name="email"]    ${email}
    Input Text    css:textarea[name="message"]    ${message}

Verify Form Validation
    [Documentation]    Test form validation with invalid inputs
    Scroll To Element    ${CONTACT_SECTION}
    Input Text    css:input[name="email"]    invalid-email
    Click Element    css:button[type="submit"]
    Element Should Be Visible    css:.error-message

Check Accessibility
    [Documentation]    Basic accessibility checks
    [Arguments]    ${section_locator}
    Element Should Have Attribute    ${section_locator}    role
    ${headings}=    Get WebElements    ${section_locator} h1, ${section_locator} h2, ${section_locator} h3
    Should Not Be Empty    ${headings}

Verify Animation
    [Documentation]    Check if animations are working
    [Arguments]    ${element_locator}
    ${initial_position}=    Get Element Attribute    ${element_locator}    style
    Scroll To Element    ${element_locator}
    Sleep    2s
    ${final_position}=    Get Element Attribute    ${element_locator}    style
    Should Not Be Equal    ${initial_position}    ${final_position}