=== Tap Top ===
Contributors: iruserwp9
Tags: back to top, scroll to top, accessibility, progress ring, gutenberg
Requires at least: 5.6
Requires PHP: 7.2
Tested up to: 6.8
Stable tag: 1.2.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Advanced back-to-top button with smart scroll library detection, universal anchor fixes, adaptive positioning, and accessibility features.

== Description ==

**Tap Top** goes far beyond simple back-to-top plugins by solving real problems that modern WordPress sites face with scroll libraries and complex layouts.

= 🚀 What Makes Tap Top Unique =

**Library-Aware Scroll Behavior**
* **Automatic Detection**: Detects Lenis, Locomotive Scroll, and SmoothScrollbar automatically
* **Native API Integration**: Uses each library's public API to avoid conflicts and broken behavior
* **Multi-Container Support**: Works with nested scroll containers and page builder layouts
* **Graceful Fallback**: Custom smooth scroll for sites without these libraries

**Universal Anchor Link Fixes**
* **Cross-Library Normalization**: Makes anchor links work consistently across all scroll libraries
* **Smart Offset Detection**: Automatically accounts for sticky headers and fixed elements
* **In-Page TOC Support**: Ensures table of contents and anchor navigation work perfectly
* **Hash URL Handling**: Proper deep-linking support with smooth scrolling

**Adaptive Positioning & Obstruction Avoidance**
* **Smart Detection**: Automatically detects cookie banners, chat widgets, and other fixed elements
* **Dynamic Repositioning**: Moves button to avoid overlapping with other interface elements
* **Mobile Safe Areas**: Full support for iPhone notches, Android punch-holes, and gesture areas
* **ResizeObserver Integration**: Responds to layout changes in real-time

**Accessibility-First Design**
* **Motion Preferences**: Respects `prefers-reduced-motion` setting automatically
* **Screen Reader Support**: Proper ARIA labels and semantic markup
* **Keyboard Navigation**: Full keyboard accessibility support
* **High Contrast Mode**: Enhanced visibility in high-contrast and forced-colors modes
* **Focus Management**: Proper focus handling and visual indicators

**Advanced Gutenberg Integration**
* **Full Site Editor Support**: Works perfectly with block themes and site editing
* **Per-Template Overrides**: Different settings for different templates and pages
* **Live Preview**: Real-time preview in the block editor
* **Flexible Display Modes**: Global, Block-Only, or Hybrid approaches

**Performance & Modern Development**
* **Zero Dependencies**: No jQuery or external libraries required
* **Efficient Loading**: Idle-until-visible and intelligent loading strategies
* **GPU Acceleration**: Hardware-accelerated animations where supported
* **Minimal Footprint**: Lightweight code with maximum functionality

= 📋 Supported Scroll Libraries =

**Tested and Verified:**
* ✅ **Lenis** (v1.0+) - Automatic detection and native API integration
* ✅ **Locomotive Scroll** (v4.x and v5.x) - Full compatibility with both versions
* ✅ **SmoothScrollbar** (v8.x) - Native API usage for smooth integration
* ✅ **Custom Scroll Containers** - Detects nested and custom implementations
* ✅ **Native Browser Scrolling** - Enhanced smooth scrolling fallback

**How It Works:**
The plugin detects which scroll library is active and uses its native API methods:
* Lenis: `lenis.scrollTo()` with proper easing
* Locomotive: `locomotive.scrollTo()` with momentum preservation
* SmoothScrollbar: `scrollbar.scrollTo()` with native smooth timing

= 🎯 Display Modes =

**Global Mode**
* Traditional site-wide button with centralized settings
* Show/hide rules based on page types
* Content exclusion system for specific pages
* Perfect for sites that want consistent behavior everywhere

**Block-Only Mode**
* Use Gutenberg blocks for complete per-page control
* Each block has independent settings (colors, position, behavior)
* No global button - only blocks you explicitly add
* Ideal for complex sites with varied requirements

**Hybrid Mode**
* Global settings provide the default behavior
* Blocks override global settings on pages where they exist
* Best of both worlds - consistency with flexibility
* Recommended for most professional sites

= 🔧 Key Features =

**Scroll Progress Ring**
* Beautiful circular progress indicator around the button
* Shows exact scroll progress (0-100%)
* Fully customizable colors, width, and background
* Automatically disabled for users with motion sensitivity
* Smooth 60fps animations with performance optimization

**Smart Positioning**
* Automatic detection of cookie banners, chat widgets, sticky headers
* Dynamic repositioning to avoid interface conflicts
* Mobile-first design with safe-area insets
* Responsive behavior across all device sizes
* Smooth transitions when obstacles appear/disappear

**Comprehensive Customization**
* Position control (left/right with pixel-perfect offsets)
* Size adjustment (24px to 80px)
* Color customization (background, icon, progress ring)
* Animation timing and easing preferences
* Show/hide conditions and page-specific rules

= 📱 Mobile & Device Support =

**Mobile Optimization**
* iPhone safe-area support (notches, Dynamic Island)
* Android safe-area support (punch-holes, gesture bars)
* Touch-optimized button sizing and positioning
* Responsive design that adapts to orientation changes

**Cross-Browser Compatibility**
* Modern browsers with ES6+ support
* Graceful degradation for older browsers
* Progressive enhancement approach
* Tested on iOS Safari, Chrome, Firefox, Edge

= ⚡ Performance Features =

**Loading Optimization**
* Lazy initialization - only loads when needed
* Intelligent asset enqueueing based on page content
* Minimal DOM impact with efficient event handling
* CPU-friendly animations with proper throttling

**Memory Management**
* Automatic cleanup when elements are removed
* Efficient event listener management
* ResizeObserver with proper disposal
* No memory leaks or performance degradation

== Installation ==

= Quick Start =
1. Install and activate the plugin
2. Go to **Tap Top** in your WordPress admin
3. Choose your preferred **Display Mode**
4. Customize appearance and behavior
5. For Block modes, add **Tap Top Button** blocks to your pages

= Display Mode Guide =

**For Simple Sites:** Use **Global Mode**
- One set of settings applies everywhere
- Easy to manage and consistent behavior

**For Complex Sites:** Use **Block-Only Mode**
- Complete control over each page
- Different styles and behaviors per page
- Perfect for agencies and custom designs

**For Professional Sites:** Use **Hybrid Mode**
- Global settings provide consistency
- Blocks override where you need custom behavior
- Best balance of ease and flexibility

== Frequently Asked Questions ==

= How is this different from other back-to-top plugins? =

Most plugins simply use `window.scrollTo()` which conflicts with modern scroll libraries like Lenis and Locomotive Scroll. Tap Top automatically detects these libraries and uses their native APIs for seamless integration.

Additionally, Tap Top includes advanced features like:
- Universal anchor link fixes
- Adaptive positioning to avoid UI conflicts
- Full accessibility compliance
- Mobile safe-area support
- Performance optimizations

= Does it work with page builders? =

Yes! Tap Top works perfectly with:
- Elementor (including custom scroll containers)
- Divi and Divi Builder
- Beaver Builder
- Oxygen Builder
- Bricks Builder
- And any other page builder that creates scroll containers

= Will it conflict with my smooth scroll library? =

No, quite the opposite! Tap Top enhances smooth scroll libraries by:
- Using their native APIs instead of fighting them
- Fixing anchor links to work properly with the library
- Ensuring consistent behavior across all scroll interactions

= Is it truly accessible? =

Yes, Tap Top is fully WCAG 2.1 AA compliant:
- Respects `prefers-reduced-motion` automatically
- Proper ARIA labels and semantic markup
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader friendly
- Focus management and visual indicators

= Can I use different settings on different pages? =

Absolutely! Use Block-Only or Hybrid mode to add Tap Top blocks with unique settings to any page. Each block can have completely different:
- Colors and styling
- Position and sizing
- Behavior and timing
- Progress ring settings

= Does it work on mobile devices? =

Yes, with extensive mobile optimization:
- Automatic safe-area detection for notched devices
- Touch-optimized button sizing
- Responsive positioning
- Works with mobile browsers and WebView

= Will it slow down my website? =

No, Tap Top is designed for performance:
- Lightweight vanilla JavaScript (no jQuery)
- Lazy loading and efficient initialization
- GPU-accelerated animations
- Minimal DOM impact
- Proper event throttling and debouncing

= Can I exclude specific pages? =

Yes, you can exclude:
- Individual posts and pages via the admin interface
- Entire page types (archives, search, etc.)
- Content via the search and select interface
- Pages by adding conditional logic

= Does it work with caching plugins? =

Yes, fully compatible with all major caching solutions:
- W3 Total Cache
- WP Rocket
- WP Super Cache
- LiteSpeed Cache
- Cloudflare and other CDNs

== Screenshots ==

1. **Admin Settings** - Comprehensive control panel with all customization options
2. **Block Editor** - Gutenberg block with live preview and settings panel
3. **Progress Ring** - Beautiful scroll progress indicator in action
4. **Mobile Safe Areas** - Automatic positioning on devices with notches
5. **Library Integration** - Seamless integration with Lenis smooth scrolling
6. **Accessibility** - High contrast mode and reduced motion support

== Changelog ==

= 1.2.0 =
**🎉 Major Release - WordPress Review Ready**

**NEW FEATURES:**
* ✨ **Universal Anchor Link Fixes** - Normalizes anchor behavior across all scroll libraries
* ✨ **Advanced Library Detection** - Automatic integration with Lenis, Locomotive, SmoothScrollbar
* ✨ **Adaptive Obstruction Avoidance** - Smart positioning around cookie banners and widgets
* ✨ **Full Gutenberg Integration** - Complete block system with Site Editor support
* ✨ **Three Display Modes** - Global, Block-Only, and Hybrid approaches
* ✨ **Scroll Progress Ring** - Beautiful progress indicator with accessibility support
* ✨ **Mobile Safe-Area Support** - Automatic positioning for notched devices
* ✨ **Enhanced A11y Features** - WCAG 2.1 AA compliance with motion preferences

**IMPROVEMENTS:**
* 🚀 **Performance Optimizations** - Lazy loading, efficient animations, memory management
* 🎨 **Modern CSS** - Support for CSS custom properties, safe-area-inset, forced-colors
* 📱 **Mobile-First Design** - Touch-optimized interactions and responsive behavior
* 🔧 **Developer Experience** - Clean code structure, proper WordPress standards
* 📚 **Complete Documentation** - Detailed readme with examples and troubleshooting

**TECHNICAL CHANGES:**
* Complete rewrite of JavaScript core for better library detection
* New PHP class structure for blocks and settings management
* Enhanced admin interface with live search and content selection
* Improved asset loading with conditional enqueueing
* Better integration with WordPress coding standards

**COMPATIBILITY:**
* WordPress 5.6+ (tested up to 6.8)
* PHP 7.2+ requirement
* Modern browsers with ES6+ support
* All major page builders and themes
* Popular smooth scroll libraries

**TESTING & VERIFICATION:**
* Tested with Lenis, Locomotive Scroll, and SmoothScrollbar
* Verified anchor link functionality across all supported libraries
* Performance tested on various hosting environments
* Accessibility tested with screen readers and keyboard navigation
* Mobile tested on iOS and Android devices

= 1.1.x =
* Previous stable releases with basic functionality

== Upgrade Notice ==

= 1.2.0 =
🎉 **Major update with WordPress Review requirements!** This version includes universal anchor fixes, advanced library detection, adaptive positioning, and full Gutenberg integration. All features have been tested and verified. Recommended for all users. Backup before upgrading.

== Advanced Documentation ==

= Scroll Library Integration Examples =

**Lenis Integration:**
```javascript
// Tap Top detects Lenis and uses:
lenis.scrollTo(0, {
  duration: 0.6,
  easing: (t) => 1 - Math.pow(1 - t, 3)
})
```

**Locomotive Scroll Integration:**
```javascript
// Automatically integrates with Locomotive:
locomotive.scrollTo(0, {
  duration: 600,
  easing: [0.25, 0.00, 0.35, 1.00]
})
```

**Custom Scroll Container Detection:**
Tap Top automatically finds scroll containers using:
- `[data-scroll-container]` attributes
- Locomotive Scroll wrapper detection
- Nested scrollable element analysis
- Page builder scroll implementations

= Block Customization Guide =

Each Tap Top block supports independent configuration:

**Basic Settings:**
- Position (left/right)
- Size (24-80px)
- Colors (background, icon)
- Show/hide conditions

**Progress Ring Settings:**
- Enable/disable per block
- Custom colors and width
- Background ring styling
- Animation preferences

**Advanced Settings:**
- Custom offsets and positioning
- Scroll threshold adjustment
- Accessibility label customization
- Motion preference handling

= Developer Hooks =

**Filters:**
- `taptop_global_config` - Modify global configuration
- `taptop_block_attributes` - Customize block defaults
- `taptop_should_load` - Control when assets load
- `taptop_excluded_pages` - Programmatically exclude pages

**Actions:**
- `taptop_before_button_render` - Before button initialization
- `taptop_after_assets_enqueue` - After assets are loaded

= Troubleshooting =

**Common Issues:**

*Button doesn't appear:*
- Check if plugin is enabled in settings
- Verify display mode configuration
- Ensure page type is not excluded
- Check browser console for JavaScript errors

*Conflicts with smooth scroll:*
- Update to latest version (1.2.0+)
- Check if scroll library is properly detected
- Verify no other plugins interfere
- Review browser console for detection logs

*Block not showing:*
- Ensure block is enabled in block settings
- Check if global plugin is enabled
- Verify display mode allows blocks
- Clear any caching plugins

*Anchor links not working:*
- Verify HTML anchors are properly set on headings
- Check browser console for Universal Anchor Fixes logs
- Ensure no theme conflicts with event handlers
- Test with default theme to isolate issues

**Getting Help:**
1. Check browser console for error messages
2. Test with default theme and minimal plugins
3. Verify WordPress and PHP version requirements
4. Use support forum with detailed information

== Privacy Policy ==

Tap Top respects user privacy and GDPR compliance:

**No Data Collection:**
- Plugin does not collect any personal data
- No external API calls or data transmission
- No user tracking or analytics
- No cookies or local storage usage

**Local Functionality:**
- All settings stored in WordPress options table
- JavaScript runs entirely client-side
- No external dependencies or CDN usage
- Respects user's motion and accessibility preferences

**Third-Party Integration:**
- Only detects presence of scroll libraries (no data sent)
- Does not modify or interfere with other plugins' data
- Safe-area detection uses CSS environment variables only

== Credits ==

Special thanks to:
- WordPress community for feedback and testing
- Accessibility consultants for WCAG compliance guidance
- Modern scroll library maintainers for API documentation
- Beta testers who helped refine the user experience