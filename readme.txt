=== Tap Top ===
Contributors: iruserwp9
Tags: back to top, scroll button, smooth scroll, floating button, gutenberg
Requires at least: 5.6
Requires PHP: 7.2
Tested up to: 6.8
Stable tag: 1.3.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Advanced back-to-top button with 6 unique shapes, smooth animations, and smart scroll library detection for WordPress.

== Description ==

**Tap Top** goes far beyond simple back-to-top plugins by solving real problems that modern WordPress sites face with scroll libraries and complex layouts.

= 🎉 What's New in Version 1.3.0 =

**✨ 6 Unique Button Shapes**
* Circle (Classic round button)
* Square (Modern angular design)
* Rounded Square (Soft corners)
* Pill (Capsule/oblong shape)
* Pentagon (5-sided polygon)
* Hexagon (6-sided polygon)

**🎬 6 Smooth Animation Styles**
* Fade (Classic smooth fade)
* Slide (Slides up from bottom)
* Scale (Zoom in/out effect)
* Bounce (Playful bounce animation)
* Rotate (Spinning entrance)
* Flip (3D flip effect)

**👆 Smart Hide on Scroll Down**
* Automatically hides button when scrolling down
* Reappears instantly when scrolling up
* Reduces visual clutter and improves UX
* Smooth transitions with accessibility support

= 🚀 Core Features =

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
* 6 unique button shapes
* 6 smooth animation styles
* Smart hide on scroll down behavior

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
- 6 unique button shapes
- 6 smooth animation styles
- Smart hide on scroll down
- Full accessibility compliance
- Mobile safe-area support
- Performance optimizations

= What are the new button shapes? =

Version 1.3.0 introduces 6 unique shapes:
- **Circle**: Classic round button (default)
- **Square**: Sharp, modern angular design
- **Rounded Square**: Soft corners for a friendly look
- **Pill**: Capsule/oblong shape
- **Pentagon**: 5-sided polygon for unique styling
- **Hexagon**: 6-sided polygon for geometric designs

= What animation styles are available? =

Choose from 6 smooth animations:
- **Fade**: Classic smooth fade in/out
- **Slide**: Slides up from bottom
- **Scale**: Zoom in/out effect
- **Bounce**: Playful bounce animation
- **Rotate**: Spinning entrance/exit
- **Flip**: 3D flip effect

All animations respect `prefers-reduced-motion` for accessibility.

= What does "Hide on Scroll Down" do? =

This UX-optimized feature automatically:
- Hides the button when user scrolls down
- Shows it instantly when scrolling up
- Reduces visual clutter during content reading
- Improves overall user experience
- Works smoothly with all animation styles

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
- Button shape and animation
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

== Screenshots ==

1. **Admin Settings v1.3.0** - New button shapes and animation options
2. **Button Shapes** - 6 unique shapes to choose from
3. **Animation Styles** - 6 smooth animation effects
4. **Block Editor** - Gutenberg block with live preview and v1.3.0 features
5. **Hide on Scroll** - Smart auto-hide behavior in action
6. **Mobile Safe Areas** - Automatic positioning on devices with notches

== Changelog ==

= 1.3.0 - 2025-01-20 =
**🎉 Major Feature Release**

**NEW FEATURES:**
* ✨ **6 Unique Button Shapes** - Circle, Square, Rounded Square, Pill, Pentagon, Hexagon
* ✨ **6 Smooth Animation Styles** - Fade, Slide, Scale, Bounce, Rotate, Flip (3D)
* ✨ **Hide on Scroll Down** - Smart auto-hide behavior for improved UX

**IMPROVEMENTS:**
* 🎨 Enhanced CSS with shape-specific styling and clip-path support
* ⚡ Optimized animations with GPU acceleration
* 📱 Better mobile performance with shape rendering
* 🔧 Improved animation transitions with prefers-reduced-motion support
* 💫 Smooth state transitions for hide-on-scroll feature

**TECHNICAL:**
* New CSS classes for shapes: `.shape-circle`, `.shape-square`, `.shape-rounded-square`, `.shape-pill`, `.shape-pentagon`, `.shape-hexagon`
* New animation classes: `.anim-fade`, `.anim-slide`, `.anim-scale`, `.anim-bounce`, `.anim-rotate`, `.anim-flip`
* Smart scroll direction detection for hide-on-scroll
* Enhanced Gutenberg block with shape and animation previews
* Full backward compatibility with v1.2.x

**COMPATIBILITY:**
* WordPress 5.6+ (tested up to 6.8)
* PHP 7.2+
* All modern browsers with CSS clip-path support
* Graceful degradation for older browsers

= 1.2.0 - 2025-01-15 =
**🎉 Major Release - WordPress.org Approved**

**NEW FEATURES:**
* ✨ Universal anchor link fixes
* ✨ Advanced library detection
* ✨ Adaptive obstruction avoidance
* ✨ Full Gutenberg integration
* ✨ Three display modes
* ✨ Scroll progress ring
* ✨ Mobile safe-area support
* ✨ Enhanced accessibility

**IMPROVEMENTS:**
* 🚀 Performance optimizations
* 🎨 Modern CSS with custom properties
* 📱 Mobile-first design
* 🔧 WordPress coding standards
* 📚 Complete documentation

= 1.1.0 =
* Initial stable release

== Upgrade Notice ==

= 1.3.0 =
🎉 **Exciting new release!** Version 1.3.0 adds 6 unique button shapes, 6 smooth animation styles, and smart hide-on-scroll behavior. Fully backward compatible with v1.2.x. Update recommended for all users to access these new design options!

= 1.2.0 =
🎉 **Major update with WordPress Review requirements!** This version includes universal anchor fixes, advanced library detection, adaptive positioning, and full Gutenberg integration. Recommended for all users. Backup before upgrading.

== Advanced Documentation ==

= Button Shape Examples =

**Circle** (Classic):
- Perfect for traditional designs
- Universal recognition
- Clean and simple

**Square** (Modern):
- Sharp, angular aesthetic
- Contemporary design
- Stands out on page

**Rounded Square**:
- Friendly, approachable
- Balanced between sharp and soft
- Popular in modern UIs

**Pill** (Capsule):
- Elongated shape
- Modern app-like feel
- Great for minimal designs

**Pentagon**:
- Unique 5-sided polygon
- Geometric visual interest
- Distinctive appearance

**Hexagon**:
- 6-sided polygon
- Technical/modern aesthetic
- Popular in tech designs

= Animation Style Guide =

**Fade** (Recommended):
- Smooth, subtle appearance
- Universal compatibility
- Low motion impact

**Slide**:
- Slides up from bottom
- Clear directional cue
- Engaging entrance

**Scale**:
- Zoom in/out effect
- Draws attention
- Modern feel

**Bounce**:
- Playful, energetic
- Fun animation
- Good for casual sites

**Rotate**:
- Spinning entrance
- Eye-catching
- Unique effect

**Flip**:
- 3D perspective effect
- Most dramatic
- Modern browsers only

All animations automatically disabled for users with `prefers-reduced-motion` setting.

= Hide on Scroll Down =

**How It Works:**
1. Button appears when scrolling up
2. Button hides when scrolling down
3. Reduces visual clutter during reading
4. Smooth transitions with chosen animation
5. Improves overall UX

**Best Practices:**
- Works great with Slide or Fade animations
- Ideal for content-heavy sites
- Reduces distraction during reading
- Users can still access by scrolling up

= Developer Hooks =

**Filters:**
- `taptop_global_config` - Modify global configuration
- `taptop_block_attributes` - Customize block defaults
- `taptop_should_load` - Control when assets load
- `taptop_excluded_pages` - Programmatically exclude pages

**Actions:**
- `taptop_before_button_render` - Before button initialization
- `taptop_after_assets_enqueue` - After assets are loaded

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

== Credits ==

Special thanks to:
- WordPress community for feedback and testing
- Accessibility consultants for WCAG compliance guidance
- Modern scroll library maintainers for API documentation
- Beta testers who helped refine the user experience
- Design inspiration from modern web applications