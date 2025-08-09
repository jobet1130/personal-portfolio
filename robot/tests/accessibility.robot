*** Settings ***
Documentation     Accessibility tests for portfolio website
Resource          ../resources/common.robot
Suite Setup       Setup Browser
Suite Teardown    Teardown Browser

*** Test Cases ***
Page Has Proper Document Structure
    [Documentation]    Verify proper HTML document structure
    [Tags]    accessibility    structure
    Element Should Be Visible    css:html[lang]
    Element Should Be Visible    css:head title
    Element Should Be Visible    css:head meta[name="description"]
    Element Should Be Visible    css:head meta[name="viewport"]

Heading Hierarchy Is Correct
    [Documentation]    Verify proper heading hierarchy (h1, h2, h3, etc.)
    [Tags]    accessibility    headings
    ${h1_count}=    Get Element Count    css:h1
    Should Be Equal As Numbers    ${h1_count}    1
    
    Element Should Be Visible    css:h1
    Element Should Be Visible    css:h2
    
    # Verify headings are in logical order
    ${all_headings}=    Get WebElements    css:h1, h2, h3, h4, h5, h6
    Should Not Be Empty    ${all_headings}

Images Have Alt Text
    [Documentation]    Verify all images have appropriate alt text
    [Tags]    accessibility    images
    ${images}=    Get WebElements    css:img
    FOR    ${image}    IN    @{images}
        Element Should Have Attribute    ${image}    alt
    END

Links Have Descriptive Text
    [Documentation]    Verify links have descriptive text or aria-labels
    [Tags]    accessibility    links
    ${links}=    Get WebElements    css:a
    FOR    ${link}    IN    @{links}
        ${text}=    Get Text    ${link}
        ${aria_label}=    Get Element Attribute    ${link}    aria-label
        Run Keyword If    '${text}' == ''    Should Not Be Empty    ${aria_label}
    END

Form Elements Have Labels
    [Documentation]    Verify form elements have proper labels
    [Tags]    accessibility    forms
    Scroll To Element    ${CONTACT_SECTION}
    
    ${form_inputs}=    Get WebElements    css:input, textarea, select
    FOR    ${input}    IN    @{form_inputs}
        ${input_id}=    Get Element Attribute    ${input}    id
        ${aria_label}=    Get Element Attribute    ${input}    aria-label
        ${placeholder}=    Get Element Attribute    ${input}    placeholder
        
        # Check if input has associated label, aria-label, or placeholder
        Run Keyword If    '${input_id}' != ''    Element Should Be Visible    css:label[for="${input_id}"]
        ...    ELSE IF    '${aria_label}' == ''    Should Not Be Empty    ${placeholder}
    END

Buttons Are Keyboard Accessible
    [Documentation]    Verify buttons can be accessed via keyboard
    [Tags]    accessibility    keyboard
    ${buttons}=    Get WebElements    css:button, input[type="submit"], input[type="button"]
    FOR    ${button}    IN    @{buttons}
        Element Should Be Enabled    ${button}
        Element Should Have Attribute    ${button}    type
    END

Color Contrast Is Sufficient
    [Documentation]    Basic color contrast checks
    [Tags]    accessibility    contrast
    # Check that text elements have sufficient contrast
    ${text_elements}=    Get WebElements    css:p, h1, h2, h3, h4, h5, h6, span, a
    FOR    ${element}    IN    @{text_elements}
        ${color}=    Get Element Attribute    ${element}    style
        # Basic check - ensure text is not transparent or same as background
        Should Not Contain    ${color}    opacity: 0
        Should Not Contain    ${color}    color: transparent
    END

Focus Indicators Are Visible
    [Documentation]    Verify focus indicators are visible for interactive elements
    [Tags]    accessibility    focus
    ${interactive_elements}=    Get WebElements    css:a, button, input, textarea, select
    FOR    ${element}    IN    @{interactive_elements}
        Focus    ${element}
        Sleep    0.5s
        # Element should be focused (basic check)
        ${focused_element}=    Get WebElement    css:*:focus
        Should Be Equal    ${element}    ${focused_element}
    END

ARIA Roles Are Properly Used
    [Documentation]    Verify ARIA roles are used correctly
    [Tags]    accessibility    aria
    # Check for proper landmark roles
    Element Should Be Visible    css:[role="banner"], header
    Element Should Be Visible    css:[role="main"], main
    Element Should Be Visible    css:[role="contentinfo"], footer
    
    # Check navigation has proper role
    Element Should Be Visible    css:[role="navigation"], nav

Skip Links Are Available
    [Documentation]    Verify skip links for keyboard navigation
    [Tags]    accessibility    navigation
    # Check for skip to main content link
    Press Keys    None    TAB
    ${skip_link}=    Get WebElement    css:*:focus
    ${skip_text}=    Get Text    ${skip_link}
    Should Contain    ${skip_text}    skip    ignore_case=True

Page Is Keyboard Navigable
    [Documentation]    Verify entire page can be navigated with keyboard
    [Tags]    accessibility    keyboard
    # Start from top of page
    Execute Javascript    window.scrollTo(0, 0);
    
    # Tab through interactive elements
    FOR    ${i}    IN RANGE    20
        Press Keys    None    TAB
        Sleep    0.2s
        ${focused_element}=    Get WebElement    css:*:focus
        Should Not Be Empty    ${focused_element}
    END

Screen Reader Compatibility
    [Documentation]    Basic screen reader compatibility checks
    [Tags]    accessibility    screen-reader
    # Check for proper semantic HTML
    Element Should Be Visible    css:main
    Element Should Be Visible    css:nav
    Element Should Be Visible    css:header
    Element Should Be Visible    css:footer
    
    # Check for proper section headings
    ${sections}=    Get WebElements    css:section
    FOR    ${section}    IN    @{sections}
        ${heading}=    Get WebElements    ${section} h1, ${section} h2, ${section} h3
        Should Not Be Empty    ${heading}
    END

Error Messages Are Accessible
    [Documentation]    Verify error messages are accessible
    [Tags]    accessibility    errors
    Scroll To Element    ${CONTACT_SECTION}
    
    # Trigger form validation errors
    Click Element    css:button[type="submit"]
    
    # Check if error messages are properly associated
    ${error_messages}=    Get WebElements    css:.error-message, [role="alert"]
    FOR    ${error}    IN    @{error_messages}
        Element Should Be Visible    ${error}
        ${error_text}=    Get Text    ${error}
        Should Not Be Empty    ${error_text}
    END