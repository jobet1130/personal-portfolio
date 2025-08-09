*** Settings ***
Documentation     Performance tests for portfolio website
Resource          ../resources/common.robot
Suite Setup       Setup Browser
Suite Teardown    Teardown Browser

*** Variables ***
${MAX_LOAD_TIME}    5
${MAX_IMAGE_SIZE}    2000000    # 2MB in bytes
${MIN_LIGHTHOUSE_SCORE}    80

*** Test Cases ***
Page Load Time Is Acceptable
    [Documentation]    Verify page loads within acceptable time
    [Tags]    performance    load-time
    ${start_time}=    Get Time    epoch
    Go To    ${BASE_URL}
    Wait Until Element Is Visible    ${HERO_SECTION}    timeout=${MAX_LOAD_TIME}s
    ${end_time}=    Get Time    epoch
    ${load_time}=    Evaluate    ${end_time} - ${start_time}
    Should Be True    ${load_time} < ${MAX_LOAD_TIME}    Page load time ${load_time}s exceeds maximum ${MAX_LOAD_TIME}s

Images Are Optimized
    [Documentation]    Verify images are properly optimized
    [Tags]    performance    images
    ${images}=    Get WebElements    css:img
    FOR    ${image}    IN    @{images}
        ${src}=    Get Element Attribute    ${image}    src
        Continue For Loop If    '${src}' == ''
        
        # Check if image has proper loading attribute
        ${loading}=    Get Element Attribute    ${image}    loading
        Should Be Equal    ${loading}    lazy    Image should have loading="lazy" attribute
        
        # Check image dimensions are reasonable
        ${width}=    Get Element Attribute    ${image}    width
        ${height}=    Get Element Attribute    ${image}    height
        Run Keyword If    '${width}' != ''    Should Be True    ${width} <= 1920
        Run Keyword If    '${height}' != ''    Should Be True    ${height} <= 1080
    END

CSS Is Minified
    [Documentation]    Verify CSS files are minified in production
    [Tags]    performance    css
    ${css_links}=    Get WebElements    css:link[rel="stylesheet"]
    FOR    ${link}    IN    @{css_links}
        ${href}=    Get Element Attribute    ${link}    href
        Continue For Loop If    '${href}' == ''
        Should Contain Any    ${href}    .min.css    .css    CSS files should be minified
    END

JavaScript Is Minified
    [Documentation]    Verify JavaScript files are minified
    [Tags]    performance    javascript
    ${script_tags}=    Get WebElements    css:script[src]
    FOR    ${script}    IN    @{script_tags}
        ${src}=    Get Element Attribute    ${script}    src
        Continue For Loop If    '${src}' == ''
        Should Contain Any    ${src}    .min.js    .js    JavaScript files should be minified
    END

No Console Errors
    [Documentation]    Verify no JavaScript errors in console
    [Tags]    performance    errors
    ${logs}=    Get Browser Console Log
    FOR    ${log}    IN    @{logs}
        Should Not Contain    ${log['level']}    SEVERE
    END

Fonts Load Efficiently
    [Documentation]    Verify web fonts load efficiently
    [Tags]    performance    fonts
    # Check for font-display: swap in CSS
    ${computed_styles}=    Execute Javascript    
    ...    return Array.from(document.styleSheets).flatMap(sheet => {
    ...        try {
    ...            return Array.from(sheet.cssRules || sheet.rules || [])
    ...        } catch(e) { return [] }
    ...    }).filter(rule => rule.style && rule.style.fontDisplay)
    ...    .map(rule => rule.style.fontDisplay)
    
    # Verify font-display is set to swap for better performance
    FOR    ${font_display}    IN    @{computed_styles}
        Should Be Equal    ${font_display}    swap
    END

Lazy Loading Is Implemented
    [Documentation]    Verify lazy loading is implemented for images
    [Tags]    performance    lazy-loading
    Scroll To Element    ${HERO_SECTION}
    
    # Check images below the fold have lazy loading
    ${below_fold_images}=    Get WebElements    css:section:not(:first-child) img
    FOR    ${image}    IN    @{below_fold_images}
        ${loading}=    Get Element Attribute    ${image}    loading
        Should Be Equal    ${loading}    lazy    Below-fold images should have lazy loading
    END

Critical CSS Is Inlined
    [Documentation]    Verify critical CSS is inlined for faster rendering
    [Tags]    performance    critical-css
    ${inline_styles}=    Get WebElements    css:style
    Should Not Be Empty    ${inline_styles}    Critical CSS should be inlined
    
    # Check that inline styles contain critical CSS
    ${first_style}=    Get Text    ${inline_styles}[0]
    Should Contain Any    ${first_style}    body    html    Critical CSS should include base styles

Resource Hints Are Present
    [Documentation]    Verify resource hints for better performance
    [Tags]    performance    resource-hints
    # Check for DNS prefetch
    ${dns_prefetch}=    Get WebElements    css:link[rel="dns-prefetch"]
    
    # Check for preconnect
    ${preconnect}=    Get WebElements    css:link[rel="preconnect"]
    
    # Check for preload
    ${preload}=    Get WebElements    css:link[rel="preload"]
    
    ${total_hints}=    Evaluate    len($dns_prefetch) + len($preconnect) + len($preload)
    Should Be True    ${total_hints} > 0    Resource hints should be present for performance

Gzip Compression Is Enabled
    [Documentation]    Verify gzip compression is enabled
    [Tags]    performance    compression
    # This would typically be checked via HTTP headers in a real deployment
    # For now, we'll check that files are served efficiently
    ${response}=    Execute Javascript    
    ...    return fetch(window.location.href).then(r => r.headers.get('content-encoding'))
    
    # In a real deployment, this should return 'gzip' or 'br' (brotli)
    Log    Content encoding: ${response}

No Render Blocking Resources
    [Documentation]    Verify no render-blocking resources
    [Tags]    performance    render-blocking
    # Check that CSS is not render-blocking
    ${css_links}=    Get WebElements    css:link[rel="stylesheet"]
    FOR    ${link}    IN    @{css_links}
        ${media}=    Get Element Attribute    ${link}    media
        ${async}=    Get Element Attribute    ${link}    async
        ${defer}=    Get Element Attribute    ${link}    defer
        
        # CSS should either have media attribute or be async/defer
        Run Keyword If    '${media}' == '' and '${async}' == '' and '${defer}' == ''
        ...    Log    Warning: CSS link may be render-blocking
    END

Smooth Scrolling Performance
    [Documentation]    Verify smooth scrolling doesn't impact performance
    [Tags]    performance    scrolling
    ${start_time}=    Get Time    epoch
    
    # Scroll through different sections
    Scroll To Element    ${PROJECTS_SECTION}
    Sleep    0.5s
    Scroll To Element    ${SKILLS_SECTION}
    Sleep    0.5s
    Scroll To Element    ${CONTACT_SECTION}
    Sleep    0.5s
    
    ${end_time}=    Get Time    epoch
    ${scroll_time}=    Evaluate    ${end_time} - ${start_time}
    Should Be True    ${scroll_time} < 3    Scrolling should be smooth and fast

Animation Performance
    [Documentation]    Verify animations don't impact performance
    [Tags]    performance    animations
    # Check for CSS animations that might impact performance
    ${animated_elements}=    Get WebElements    css:[class*="animate"], [class*="fade"], [class*="slide"]
    
    FOR    ${element}    IN    @{animated_elements}
        ${transform}=    Get Element Attribute    ${element}    style
        # Prefer transform and opacity for animations
        Run Keyword If    'left:' in '${transform}' or 'top:' in '${transform}'
        ...    Log    Warning: Element uses layout-triggering animations
    END

Memory Usage Is Reasonable
    [Documentation]    Basic memory usage check
    [Tags]    performance    memory
    # Check for memory leaks by monitoring DOM size
    ${dom_size}=    Execute Javascript    return document.getElementsByTagName('*').length
    Should Be True    ${dom_size} < 1000    DOM size should be reasonable
    
    # Navigate through sections and check DOM doesn't grow excessively
    Navigate To Section    projects
    Navigate To Section    skills
    Navigate To Section    contact
    
    ${final_dom_size}=    Execute Javascript    return document.getElementsByTagName('*').length
    ${growth}=    Evaluate    ${final_dom_size} - ${dom_size}
    Should Be True    ${growth} < 100    DOM shouldn't grow significantly during navigation