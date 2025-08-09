*** Settings ***
Documentation     Demo tests for Robot Framework functionality
Resource          ../resources/common.robot
Suite Setup       Setup Browser
Suite Teardown    Teardown Browser

*** Test Cases ***
Homepage Loads Successfully
    [Documentation]    Verify the homepage loads without errors
    [Tags]    demo    basic
    Element Should Be Visible    ${NAVBAR}
    Element Should Be Visible    ${HERO_SECTION}
    Page Should Contain    Portfolio

Navigation Bar Is Present
    [Documentation]    Verify navigation bar elements are visible
    [Tags]    demo    navigation
    Element Should Be Visible    css:.nav-brand
    Element Should Be Visible    css:.nav-links
    Element Should Contain    css:.nav-brand    Portfolio

Hero Section Content
    [Documentation]    Verify hero section displays correctly
    [Tags]    demo    hero
    Element Should Be Visible    css:.hero-title
    Element Should Be Visible    css:.hero-subtitle
    Element Should Be Visible    css:.hero-description
    Element Should Be Visible    css:.hero-actions
    Page Should Contain    Jobet P. Casquejo

Navigation Links Work
    [Documentation]    Test basic navigation functionality
    [Tags]    demo    navigation
    Click Element    css:a[href="/about"]
    Wait Until Location Contains    /about    timeout=10s
    Go Back
    Wait Until Location Contains    /    timeout=10s
    
Page Title Is Set
    [Documentation]    Verify page has a proper title
    [Tags]    demo    basic
    Title Should Be    Personal Portfolio

Responsive Design Basic Check
    [Documentation]    Basic responsive design test
    [Tags]    demo    responsive
    Set Window Size    1920    1080
    Element Should Be Visible    ${NAVBAR}
    Set Window Size    768    1024
    Element Should Be Visible    ${NAVBAR}
    Set Window Size    375    667
    Element Should Be Visible    css:.mobile-menu-toggle

Profile Image Is Present
    [Documentation]    Verify profile image is displayed
    [Tags]    demo    hero
    Element Should Be Visible    css:.profile-image
    ${alt_text}=    Get Element Attribute    css:.profile-image    alt
    Should Not Be Empty    ${alt_text}

Call To Action Buttons
    [Documentation]    Verify CTA buttons are present and functional
    [Tags]    demo    hero
    Element Should Be Visible    css:.btn-primary
    Element Should Be Visible    css:.btn-secondary
    Element Should Contain    css:.btn-primary    Explore
    Element Should Contain    css:.btn-secondary    Connect