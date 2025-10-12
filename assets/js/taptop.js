(function(){
'use strict'; 
if (!window || !document) return;

function ready(fn){ 
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); 
    else fn(); 
}

// Library Detection & Smart Scrolling
function detectScrollLibrary() {
    // Check for Lenis
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        return { type: 'lenis', instance: window.lenis };
    }
    
    // Check for Locomotive Scroll
    if (window.locomotive && window.locomotive.scroll) {
        return { type: 'locomotive', instance: window.locomotive.scroll };
    }
    
    // Check for SmoothScrollbar
    if (window.Scrollbar && window.Scrollbar.getAll) {
        var scrollbars = window.Scrollbar.getAll();
        if (scrollbars.length > 0) {
            return { type: 'smoothscrollbar', instance: scrollbars[0] };
        }
    }
    
    // Check for other common patterns
    if (document.querySelector('[data-scroll-container]')) {
        return { type: 'locomotive-detected', instance: null };
    }
    
    return { type: 'native', instance: null };
}

function smartScrollToTop(library) {
    switch (library.type) {
        case 'lenis':
            library.instance.scrollTo(0, {
                duration: 0.6,
                easing: function(t) { return 1 - Math.pow(1 - t, 3); }
            });
            break;
            
        case 'locomotive':
            library.instance.scrollTo(0, {
                duration: 600,
                easing: [0.25, 0.00, 0.35, 1.00]
            });
            break;
            
        case 'smoothscrollbar':
            library.instance.scrollTo(0, 0, 600);
            break;
            
        case 'locomotive-detected':
            // Try to find locomotive instance
            var locomotiveEl = document.querySelector('[data-scroll-container]');
            if (locomotiveEl && locomotiveEl.scrollTop !== undefined) {
                locomotiveEl.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Fallback to custom smooth scroll
                customSmoothScroll();
            }
            break;
            
        default:
            // Always use custom smooth scroll for consistent behavior
            customSmoothScroll();
            break;
    }
}

// Universal Anchor Link Fixes
function initializeAnchorFixes(scrollLibrary) {
    console.log('🔧 TapTop: Initializing Universal Anchor Fixes...');
    console.log('📚 TapTop: Scroll library type:', scrollLibrary.type);
    
    // Override default anchor link behavior
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        console.log('🔗 TapTop: Anchor link clicked:', href);
        
        if (href === '#' || href === '#!') {
            console.log('⚠️ TapTop: Empty or hash-bang link ignored');
            return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            console.log('✅ TapTop: Target element found:', targetId);
            e.preventDefault();
            smoothScrollToElement(targetElement, scrollLibrary);
        } else {
            console.log('❌ TapTop: Target element not found:', targetId);
        }
    });
    
    // Handle initial hash on page load
    if (window.location.hash) {
        console.log('🔗 TapTop: Initial hash detected:', window.location.hash);
        setTimeout(function() {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                console.log('✅ TapTop: Scrolling to initial hash target:', targetId);
                smoothScrollToElement(targetElement, scrollLibrary);
            }
        }, 500); // Increased delay for theme compatibility
    }
}

function smoothScrollToElement(element, library) {
    const elementRect = element.getBoundingClientRect();
    const offset = getScrollOffset();
    let targetPosition;
    
    console.log('🎯 TapTop: Scrolling to element:', element.id);
    console.log('📍 TapTop: Current position:', window.pageYOffset);
    console.log('🎯 TapTop: Target element top:', elementRect.top);
    console.log('📏 TapTop: Header offset:', offset);
    
    switch (library.type) {
        case 'lenis':
            // Calculate position relative to document
            targetPosition = window.pageYOffset + elementRect.top - offset;
            console.log('🎨 TapTop: Using Lenis scroll to:', targetPosition);
            library.instance.scrollTo(targetPosition, {
                duration: 0.8,
                easing: function(t) { return 1 - Math.pow(1 - t, 3); }
            });
            break;
            
        case 'locomotive':
            targetPosition = window.pageYOffset + elementRect.top - offset;
            console.log('🚂 TapTop: Using Locomotive scroll to:', targetPosition);
            library.instance.scrollTo(targetPosition, {
                duration: 800,
                easing: [0.25, 0.00, 0.35, 1.00]
            });
            break;
            
        case 'smoothscrollbar':
            targetPosition = library.instance.scrollTop + elementRect.top - offset;
            console.log('📜 TapTop: Using SmoothScrollbar to:', targetPosition);
            library.instance.scrollTo(0, targetPosition, 800);
            break;
            
        default:
            targetPosition = window.pageYOffset + elementRect.top - offset;
            console.log('⚡ TapTop: Using custom scroll to:', targetPosition);
            if (respectsReducedMotion()) {
                window.scrollTo(0, targetPosition);
            } else {
                customSmoothScrollTo(targetPosition);
            }
            break;
    }
}

function getScrollOffset() {
    // Detect sticky headers and other obstructions
    let offset = 0;
    
    // Common sticky header selectors (including WoodMart specific)
    const stickyElements = document.querySelectorAll(
        '.sticky-header, .fixed-header, [data-sticky], .site-header.fixed, .navbar-fixed-top, .header-fixed, .whb-header, .woodmart-sticky-header, .wd-header'
    );
    
    stickyElements.forEach(function(element) {
        const style = window.getComputedStyle(element);
        if (style.position === 'fixed' && 
            (element.offsetTop === 0 || style.top === '0px')) {
            offset = Math.max(offset, element.offsetHeight);
        }
    });
    
    console.log('📏 TapTop: Detected sticky header offset:', offset + 'px');
    // Default offset if no sticky elements found (WoodMart usually has headers)
    return offset || 80;
}

function customSmoothScrollTo(targetPosition) {
    const start = window.pageYOffset;
    const distance = targetPosition - start;
    const duration = 800;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * easeOut);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Accessibility: Check for reduced motion preference
function respectsReducedMotion() {
    var hasMatchMedia = window.matchMedia && typeof window.matchMedia === 'function';
    if (!hasMatchMedia) {
        return false;
    }
    
    var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
}

function customSmoothScroll() {
    var start = window.pageYOffset || document.documentElement.scrollTop;
    if (start === 0) return;
    
    // Respect reduced motion preference
    if (respectsReducedMotion()) {
        window.scrollTo(0, 0);
        return;
    }
    
    var startTime = null;
    var duration = 600;
    
    function smoothScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var progress = Math.min(timeElapsed / duration, 1);
        
        // Ease out cubic
        var easeOut = 1 - Math.pow(1 - progress, 3);
        var position = start * (1 - easeOut);
        
        window.scrollTo(0, position);
        
        if (progress < 1) {
            requestAnimationFrame(smoothScroll);
        }
    }
    
    requestAnimationFrame(smoothScroll);
}

function getScrollProgress(library) {
    var scrollTop, scrollHeight, windowHeight;
    
    switch (library.type) {
        case 'lenis':
            scrollTop = library.instance.scroll || 0;
            scrollHeight = library.instance.limit || document.documentElement.scrollHeight;
            windowHeight = window.innerHeight;
            break;
            
        case 'locomotive':
            var locomotiveEl = library.instance.el || document.documentElement;
            scrollTop = (library.instance.scroll && library.instance.scroll.y) || locomotiveEl.scrollTop || 0;
            scrollHeight = locomotiveEl.scrollHeight;
            windowHeight = window.innerHeight;
            break;
            
        case 'smoothscrollbar':
            scrollTop = library.instance.scrollTop || 0;
            scrollHeight = (library.instance.limit && library.instance.limit.y) || library.instance.size.content.height;
            windowHeight = library.instance.size.container.height;
            break;
            
        default:
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            windowHeight = window.innerHeight;
            break;
    }
    
    var maxScroll = scrollHeight - windowHeight;
    return maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
}

// Helper function for forcing position styles
function forcePosition(element, pos, offset) {
    if (pos === 'left') {
        // Force left positioning
        element.style.setProperty('left', offset + 'px', 'important');
        element.style.setProperty('right', 'auto', 'important');
        element.style.removeProperty('margin-left');
        element.style.removeProperty('margin-right');
    } else {
        // Force right positioning  
        element.style.setProperty('right', offset + 'px', 'important');
        element.style.setProperty('left', 'auto', 'important');
        element.style.removeProperty('margin-left');
        element.style.removeProperty('margin-right');
    }
}

ready(function(){
    console.log('🚀 TapTop: Initializing...');
    
    // Handle both global config and block configs
    var globalCfg = window.TapTopConfig || {};
    var blockConfigs = window.TapTopBlocks || [];
    
    // Check if we have any blocks
    var hasBlocks = blockConfigs && Array.isArray(blockConfigs) && blockConfigs.length > 0;
    var hasGlobal = globalCfg && Object.keys(globalCfg).length > 0;
    
    console.log('🔧 TapTop: hasBlocks =', hasBlocks, ', hasGlobal =', hasGlobal);
    
    // Initialize anchor fixes once - ALWAYS run this regardless of buttons
    var scrollLibrary = detectScrollLibrary();
    console.log('📚 TapTop: Detected scroll library:', scrollLibrary.type);
    initializeAnchorFixes(scrollLibrary);
    
    // Priority Logic for all modes:
    if (hasBlocks) {
        // Block configs exist - they always take priority (Block-Only, Hybrid)
        console.log('🎯 TapTop: Using block configs');
        blockConfigs.forEach(function(cfg) {
            if (cfg && typeof cfg === 'object') {
                createButton(cfg);
            }
        });
        return;
    }
    
    // No block configs - use global config (Global Mode or Hybrid without blocks)
    if (hasGlobal) {
        console.log('🌍 TapTop: Using global config');
        createButton(globalCfg);
    } else {
        console.log('⚠️ TapTop: No config found, but anchor fixes still active');
    }
    
    function createButton(cfg) {
        // Detect scroll library once per button
        var scrollLibrary = detectScrollLibrary();
        
        var position = cfg.position || 'right';
        var size = parseInt(cfg.size || 48, 10);
        var showAfter = Math.max(0, parseInt(cfg.showAfter || 200, 10));
        var offsetBottom = Math.max(0, parseInt(cfg.offsetBottom || 24, 10));
        var offsetSide = Math.max(0, parseInt(cfg.offsetSide || 24, 10));
        var bg = cfg.bgColor || '#111111';
        var ic = cfg.iconColor || '#ffffff';
        var aria = cfg.ariaLabel || 'Back to top';
        
        // Progress Ring settings
        var showProgress = parseInt(cfg.showProgress || 0, 10);
        var progressColor = cfg.progressColor || '#007cba';
        var progressWidth = parseInt(cfg.progressWidth || 3, 10);
        var progressBgColor = cfg.progressBgColor || 'rgba(255,255,255,0.2)';
        
        // Adaptive positioning setting - NOW READS FROM CONFIG
        var adaptivePositioning = parseInt(cfg.adaptivePositioning !== undefined ? cfg.adaptivePositioning : 1, 10);

        // Accessibility: Check for reduced motion
        var reducedMotion = respectsReducedMotion();
        
        // Log detected library for debugging (only once)
        if (scrollLibrary.type !== 'native') {
            console.log('TapTop: Detected scroll library -', scrollLibrary.type);
        }
        if (reducedMotion) {
            console.log('TapTop: Reduced motion detected - animations disabled');
        }

        var btn = document.createElement('button');
        btn.type='button'; 
        btn.className='taptop-btn' + (adaptivePositioning ? ' adaptive' : ''); 
        btn.setAttribute('aria-label', aria);
        btn.setAttribute('data-safe-area', 'true'); // Enable safe area support
        
        // Adaptive transitions based on motion preference
        var transitionCSS = reducedMotion ? 
            'position:fixed;display:inline-flex;align-items:center;justify-content:center;border:none;border-radius:9999px;box-shadow:0 8px 24px rgba(0,0,0,.18);cursor:pointer;opacity:0;z-index:2147483647;outline:none;' :
            'position:fixed;display:inline-flex;align-items:center;justify-content:center;border:none;border-radius:9999px;box-shadow:0 8px 24px rgba(0,0,0,.18);cursor:pointer;transition:opacity .22s ease,transform .22s ease,bottom .3s ease;opacity:0;transform:scale(.96);z-index:2147483647;outline:none;';
        
        btn.style.cssText = transitionCSS;
        btn.style.width=size+'px'; 
        btn.style.height=size+'px'; 
        btn.style.backgroundColor=bg;
        
        // Store original offsets for adaptive positioning
        var originalBottomOffset = offsetBottom < 8 ? 8 : offsetBottom;
        var originalSideOffset = offsetSide < 8 ? 8 : offsetSide;
        
        // Set initial position with force override for browser compatibility
        btn.style.bottom = originalBottomOffset + 'px';
        forcePosition(btn, position, originalSideOffset);
        
        // Debug log for position
        console.log('TapTop: Button positioned -', position, 'side with', originalSideOffset + 'px offset');

        // Conditional Obstruction Detection System
        var obstructionDetector;
        
        if (adaptivePositioning) {
            // Full Position-Aware Obstruction Detection System
            obstructionDetector = {
                lastCheck: 0,
                lastBottom: originalBottomOffset,
                hasLoggedInit: false,
                resizeObserver: null,
                intervalId: null,
                
                init: function() {
                    this.setupResizeObserver();
                    this.updateButtonPosition(); // Initial position
                    this.startPeriodicCheck();
                },
                
                setupResizeObserver: function() {
                    if (window.ResizeObserver) {
                        var self = this;
                        this.resizeObserver = new ResizeObserver(function(entries) {
                            // Throttle resize updates
                            clearTimeout(self.resizeTimeout);
                            self.resizeTimeout = setTimeout(function() {
                                self.updateButtonPosition();
                            }, 300);
                        });
                        // Observe body for general layout changes
                        this.resizeObserver.observe(document.body);
                    }
                },
                
                calculateSafePosition: function() {
                    var viewportHeight = window.innerHeight;
                    var viewportWidth = window.innerWidth;
                    var safeBottom = originalBottomOffset;
                    
                    // Get mobile safe areas
                    var safeAreaBottom = this.getSafeAreaInset('bottom');
                    safeBottom += safeAreaBottom;
                    
                    // Find all fixed elements in the same corner
                    var allElements = document.querySelectorAll('*');
                    var foundObstructions = false;
                    
                    allElements.forEach(function(element) {
                        // Skip our own button
                        if (element === btn || element.classList.contains('taptop-btn')) {
                            return;
                        }
                        
                        var style = window.getComputedStyle(element);
                        var rect = element.getBoundingClientRect();
                        
                        // Check if element is fixed and visible
                        if (style.position === 'fixed' && 
                            style.display !== 'none' && 
                            style.visibility !== 'hidden' &&
                            rect.width > 10 && rect.height > 10) {
                            
                            // Check if in bottom area
                            var isBottomArea = rect.bottom > viewportHeight * 0.5; // Bottom 50% of page
                            
                            // Check if in same corner as our button
                            var isInSameCorner = false;
                            if (position === 'right') {
                                // If button is on right, only check right side elements
                                isInSameCorner = rect.right > viewportWidth * 0.5;
                            } else {
                                // If button is on left, only check left side elements
                                isInSameCorner = rect.left < viewportWidth * 0.5;
                            }
                            
                            if (isBottomArea && isInSameCorner) {
                                var elementBottom = viewportHeight - rect.top;
                                var newBottom = elementBottom + 15; // 15px spacing
                                
                                // Ensure it doesn't go too high
                                if (newBottom > safeBottom && newBottom < viewportHeight - size - 8) {
                                    safeBottom = newBottom;
                                    foundObstructions = true;
                                }
                            }
                        }
                    });
                    
                    // Log adaptive positioning activation only once
                    if (foundObstructions && !this.hasLoggedInit) {
                        console.log('TapTop: Adaptive positioning active -', position, 'side');
                        this.hasLoggedInit = true;
                    }
                    
                    // Limit movement to maximum 200px
                    var maxMovement = 200;
                    safeBottom = Math.min(safeBottom, originalBottomOffset + maxMovement);
                    
                    return {
                        bottom: Math.max(originalBottomOffset, safeBottom),
                        side: originalSideOffset // Always use original position
                    };
                },
                
                getSafeAreaInset: function(side) {
                    // Try CSS env() variables first
                    var testEl = document.createElement('div');
                    testEl.style.position = 'fixed';
                    testEl.style.top = '-9999px';
                    testEl.style.left = '-9999px';
                    testEl.style.visibility = 'hidden';
                    
                    var property = '';
                    switch (side) {
                        case 'bottom':
                            property = 'env(safe-area-inset-bottom)';
                            break;
                        case 'left':
                            property = 'env(safe-area-inset-left)';
                            break;
                        case 'right':
                            property = 'env(safe-area-inset-right)';
                            break;
                        default:
                            return 0;
                    }
                    
                    testEl.style[side] = property;
                    document.body.appendChild(testEl);
                    
                    var computedStyle = window.getComputedStyle(testEl);
                    var value = computedStyle[side];
                    var pixels = 0;
                    
                    if (value && value !== 'auto' && value !== '0px') {
                        pixels = parseInt(value, 10) || 0;
                    }
                    
                    document.body.removeChild(testEl);
                    
                    // Fallback detection for older browsers or specific devices
                    if (pixels === 0) {
                        pixels = this.detectSafeAreaFallback(side);
                    }
                    
                    return pixels;
                },
                
                detectSafeAreaFallback: function(side) {
                    // Heuristic detection for common devices
                    var ua = navigator.userAgent.toLowerCase();
                    var isIOS = /iphone|ipad/.test(ua);
                    var isAndroid = /android/.test(ua);
                    
                    if (isIOS && side === 'bottom') {
                        // iPhone with home indicator
                        if (window.screen.height === 812 || window.screen.height === 896 || 
                            window.screen.height === 844 || window.screen.height === 926) {
                            return 34; // Home indicator height
                        }
                    }
                    
                    if (isAndroid && side === 'bottom') {
                        // Android gesture navigation
                        if (window.navigator.userAgent.includes('Android')) {
                            return 16; // Typical gesture bar height
                        }
                    }
                    
                    return 0;
                },
                
                updateButtonPosition: function() {
                    var now = Date.now();
                    if (now - this.lastCheck < 3000) return; // Throttle updates to 3 seconds
                    this.lastCheck = now;
                    
                    var safePos = this.calculateSafePosition();
                    
                    // Only update if position actually changed significantly
                    if (Math.abs(this.lastBottom - safePos.bottom) > 15) {
                        
                        // Smooth transition to new position (vertical only)
                        btn.style.bottom = safePos.bottom + 'px';
                        
                        // Keep horizontal position fixed with force override
                        forcePosition(btn, position, originalSideOffset);
                        
                        // Update last position
                        this.lastBottom = safePos.bottom;
                        
                        // Silent mode - no position change logging
                    }
                },
                
                startPeriodicCheck: function() {
                    var self = this;
                    // Check every 8 seconds for new obstructions (very relaxed frequency)
                    this.intervalId = setInterval(function() {
                        // Only check if page is visible
                        if (document.visibilityState === 'visible') {
                            self.updateButtonPosition();
                        }
                    }, 8000);
                },
                
                destroy: function() {
                    if (this.resizeObserver) {
                        this.resizeObserver.disconnect();
                    }
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                    if (this.resizeTimeout) {
                        clearTimeout(this.resizeTimeout);
                    }
                }
            };
        } else {
            // Simple placeholder when adaptive positioning is disabled
            obstructionDetector = {
                init: function() {
                    console.log('TapTop: Adaptive positioning disabled by user setting');
                },
                destroy: function() {}
            };
        }

        // Create progress ring if enabled
        var progressRing = null;
        var progressCircle = null;
        var circumference = 0;
        
        if (showProgress) {
            var svgNS = 'http://www.w3.org/2000/svg';
            progressRing = document.createElementNS(svgNS, 'svg');
            progressRing.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
            progressRing.setAttribute('aria-hidden', 'true');
            progressRing.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;transform:rotate(-90deg);';
            
            var radius = (size / 2) - (progressWidth / 2);
            circumference = 2 * Math.PI * radius;
            
            // Background circle
            var bgCircle = document.createElementNS(svgNS, 'circle');
            bgCircle.setAttribute('cx', size / 2);
            bgCircle.setAttribute('cy', size / 2);
            bgCircle.setAttribute('r', radius);
            bgCircle.setAttribute('fill', 'none');
            bgCircle.setAttribute('stroke', progressBgColor);
            bgCircle.setAttribute('stroke-width', progressWidth);
            progressRing.appendChild(bgCircle);
            
            // Progress circle
            progressCircle = document.createElementNS(svgNS, 'circle');
            progressCircle.setAttribute('cx', size / 2);
            progressCircle.setAttribute('cy', size / 2);
            progressCircle.setAttribute('r', radius);
            progressCircle.setAttribute('fill', 'none');
            progressCircle.setAttribute('stroke', progressColor);
            progressCircle.setAttribute('stroke-width', progressWidth);
            progressCircle.setAttribute('stroke-linecap', 'round');
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference;
            progressCircle.style.transition = 'stroke-dashoffset 0.1s ease-out';
            
            progressRing.appendChild(progressCircle);
            btn.appendChild(progressRing);
        }

        // Create icon
        var iconSvg = document.createElementNS('http://www.w3.org/2000/svg','svg'); 
        iconSvg.setAttribute('viewBox','0 0 24 24'); 
        iconSvg.setAttribute('aria-hidden','true');
        iconSvg.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;display:block;z-index:1;';
        iconSvg.style.width=Math.round(size*0.46)+'px'; 
        iconSvg.style.height=Math.round(size*0.46)+'px';
        var path=document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttribute('d','M6.5 14.5 L12 9 L17.5 14.5'); 
        path.setAttribute('fill','none');
        path.setAttribute('stroke', ic); 
        path.setAttribute('stroke-width','2.5'); 
        path.setAttribute('stroke-linecap','round'); 
        path.setAttribute('stroke-linejoin','round');
        iconSvg.appendChild(path);

        btn.appendChild(iconSvg); 
        document.body.appendChild(btn);

        // Initialize obstruction detection after button is added to DOM
        setTimeout(function() {
            forcePosition(btn, position, originalSideOffset);
            obstructionDetector.init();
        }, 100);

        var visible=false;
        
        function updateProgress() {
            if (showProgress && progressCircle) {
                var progress = getScrollProgress(scrollLibrary);
                var offset = circumference - (progress * circumference);
                progressCircle.style.strokeDashoffset = offset;
            }
        }
        
        function show(){ 
            if(!visible){ 
                btn.style.opacity='1'; 
                if (!reducedMotion) {
                    btn.style.transform='scale(1)'; 
                }
                visible=true; 
            } 
        } 
        
        function hide(){ 
            if(visible){ 
                btn.style.opacity='0'; 
                if (!reducedMotion) {
                    btn.style.transform='scale(.96)'; 
                }
                visible=false; 
            } 
        }
        
        function update(){ 
            var progress = getScrollProgress(scrollLibrary);
            var currentScroll = progress * (document.documentElement.scrollHeight - window.innerHeight);
            
            if (currentScroll > showAfter) show(); 
            else hide();
            updateProgress();
        }

        // Use appropriate scroll listener based on library
        if (scrollLibrary.type === 'lenis' && scrollLibrary.instance) {
            scrollLibrary.instance.on('scroll', update);
        } else if (scrollLibrary.type === 'locomotive' && scrollLibrary.instance) {
            scrollLibrary.instance.on('scroll', update);
        } else {
            window.addEventListener('scroll', update, {passive:true});
        }
        
        // Listen for window resize to update position (throttled)
        var resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                if (adaptivePositioning && obstructionDetector.updateButtonPosition) {
                    obstructionDetector.updateButtonPosition();
                }
                // Force position again on resize
                forcePosition(btn, position, originalSideOffset);
            }, 750);
        }, {passive: true});
        
        update();

        btn.addEventListener('click', function(e){
            if(e && e.preventDefault) e.preventDefault(); 
            smartScrollToTop(scrollLibrary);
        }, {passive:false});
        
        // Cleanup function for when button is removed
        btn._tapTopCleanup = function() {
            obstructionDetector.destroy();
        };
    }
});

})();