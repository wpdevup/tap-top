# Tap Top – Advanced Back to Top Button for WordPress

---

## 🎉 What's New in v1.3.0

### ✨ 6 Unique Button Shapes
Choose from stunning button shapes that no other plugin offers:
- **Circle** - Classic round button (default)
- **Square** - Modern angular design  
- **Rounded Square** - Soft, friendly corners
- **Pill** - Sleek capsule shape
- **Pentagon** - Unique 5-sided polygon
- **Hexagon** - Geometric 6-sided design

### 🎬 6 Smooth Animation Styles
Engaging animations that respect user preferences:
- **Fade** - Classic smooth transition
- **Slide** - Slides up from bottom
- **Scale** - Dynamic zoom effect
- **Bounce** - Playful bounce animation
- **Rotate** - Eye-catching spin entrance
- **Flip** - Dramatic 3D flip effect

### 👆 Smart Hide on Scroll Down
**NEW UX-Optimized Feature:**
- Button automatically hides when scrolling down
- Instantly reappears when scrolling up
- Reduces visual clutter during content reading
- Smooth transitions with accessibility support
- Works perfectly with all animation styles

---

## 🎯 Why Tap Top?

Most back-to-top plugins **break** when used with modern smooth scroll libraries like Lenis, Locomotive Scroll, or SmoothScrollbar. They fight against the scroll behavior, causing jarring jumps and broken animations.

**Tap Top is different.** It automatically detects your scroll library and uses its native API for seamless integration.

### The Problem with Other Plugins

```javascript
// ❌ Other plugins do this:
window.scrollTo(0, 0); // Breaks smooth scroll libraries!

// ✅ Tap Top does this:
lenis.scrollTo(0, { duration: 0.6 }); // Works perfectly!
```

---

## ✨ Features

### 🎨 Visual Customization (NEW in v1.3.0)

#### 6 Unique Button Shapes
```
Circle          ⚫  Classic round button
Square          ⬜  Sharp, modern look
Rounded Square  ⬛  Soft corners
Pill            💊  Capsule shape
Pentagon        ⬟   5-sided polygon
Hexagon         ⬢   6-sided polygon
```

#### 6 Smooth Animation Styles
```
Fade     Classic smooth fade in/out
Slide    Slides up from bottom edge
Scale    Zoom in/out effect
Bounce   Playful bounce animation
Rotate   Spinning entrance/exit
Flip     Dramatic 3D flip effect
```

**All animations respect `prefers-reduced-motion` for accessibility.**

### 👆 Smart Behavior (NEW in v1.3.0)

#### Hide on Scroll Down
- **Auto-hide**: Button hides when scrolling down
- **Auto-show**: Reappears instantly when scrolling up
- **UX Optimized**: Reduces distraction during reading
- **Smooth**: Works with all animation styles
- **Performance**: Efficient scroll direction detection

### 🔌 Smart Library Detection
Automatically detects and integrates with popular scroll libraries:

- **Lenis** - Uses `lenis.scrollTo()` with proper easing
- **Locomotive Scroll** - Uses `locomotive.scrollTo()` with momentum
- **SmoothScrollbar** - Uses native `scrollbar.scrollTo()`
- **Custom Containers** - Detects nested scroll implementations
- **Native Fallback** - Custom smooth scroll for standard sites

### 🔗 Universal Anchor Link Fixes
The **only** WordPress plugin that fixes anchor links across all scroll libraries:

- ✅ Table of contents navigation works properly
- ✅ Hash URLs (`yoursite.com/page#section`) work on page load
- ✅ Smooth scrolling to anchors with offset detection
- ✅ Automatic sticky header compensation
- ✅ Works with WoodMart, Elementor, and all major themes

### 📱 Adaptive Positioning System
Intelligently avoids UI conflicts:

- **Cookie Banners** - Automatically repositions above GDPR notices
- **Chat Widgets** - Detects LiveChat, Tawk.to, Intercom, etc.
- **Mobile Safe Areas** - Full support for iPhone notches, Android punch-holes
- **Gesture Bars** - Respects iOS and Android navigation gestures
- **Real-time Detection** - Responds to dynamic layout changes

### ⚡ Three Display Modes

#### Global Mode
Traditional site-wide button with centralized settings:
```
✓ Configure once, works everywhere
✓ Show/hide rules based on page types
✓ Exclude specific posts/pages
```

#### Block-Only Mode
Complete per-page control via Gutenberg:
```
✓ Add blocks only where needed
✓ Each block has independent settings
✓ Different colors/positions per page
✓ NEW: Different shapes and animations per page
```

#### Hybrid Mode (Recommended)
Best of both worlds:
```
✓ Global settings as default
✓ Blocks override on specific pages
✓ Maximum flexibility
```

### 🎨 Scroll Progress Ring
Beautiful circular progress indicator:

- Real-time scroll progress (0-100%)
- Customizable colors and width
- Smooth 60fps animations
- Automatically disabled for users with motion sensitivity

### ♿ Accessibility First
WCAG 2.1 AA compliant out of the box:

- ✅ Respects `prefers-reduced-motion`
- ✅ Proper ARIA labels and roles
- ✅ Full keyboard navigation support
- ✅ Screen reader friendly
- ✅ High contrast mode compatible
- ✅ Focus management with visible indicators

### 🚀 Performance Optimized

- **Zero Dependencies** - No jQuery or external libraries
- **Lazy Loading** - Only initializes when needed
- **GPU Acceleration** - Hardware-accelerated animations
- **Efficient Events** - Proper throttling and debouncing
- **Minimal DOM** - Lightweight footprint
- **No Memory Leaks** - Proper cleanup and disposal

---

## 📸 Screenshots

**Version 1.3.0 Screenshots Coming Soon**

---

## 🚀 Installation

### Method 1: WordPress.org (Recommended)

1. Go to **Plugins → Add New** in WordPress admin
2. Search for **"Tap Top"**
3. Click **Install Now** → **Activate**
4. Go to **Tap Top** menu to customize

### Method 2: Manual Upload

1. Download latest release from [WordPress.org](https://wordpress.org/plugins/tap-top/)
2. Go to **Plugins → Add New → Upload Plugin**
3. Choose the downloaded ZIP file
4. Click **Install Now** → **Activate**

### Method 3: FTP Upload

1. Download and unzip the plugin
2. Upload `tap-top` folder to `/wp-content/plugins/`
3. Activate via WordPress admin

### Method 4: Composer

```bash
composer require wpackagist-plugin/tap-top
```

---

## 📖 Documentation

### Quick Start

#### Using Global Mode

1. Go to **Tap Top → Settings** in WordPress admin
2. Ensure **Display Mode** is set to **Global Mode**
3. Enable **Show on Posts** and **Show on Pages**
4. **NEW**: Choose your preferred **Button Shape**
5. **NEW**: Select an **Animation Style**
6. **NEW**: Enable **Hide on Scroll Down** for better UX
7. Customize colors, position, and size
8. Save changes

The button will now appear site-wide based on your settings.

#### Using Gutenberg Blocks

1. Edit any post or page
2. Add **Tap Top Button** block
3. Customize in block settings panel:
   - **NEW**: Button Shape (6 options)
   - **NEW**: Animation Style (6 options)
   - **NEW**: Hide on Scroll Down
   - Colors (background, icon, progress ring)
   - Position (left or right)
   - Size and offsets
   - Enable/disable progress ring
4. Publish the page

Each block has independent settings.

---

### Configuration Options

#### Display Control

| Setting | Description | Default |
|---------|-------------|---------|
| Enable Plugin | Master on/off switch | On |
| Display Mode | Global / Block-Only / Hybrid | Global |
| Adaptive Positioning | Smart obstruction avoidance | On |
| Show on Homepage | Display on front page | On |
| Show on Posts | Display on single posts | On |
| Show on Pages | Display on single pages | On |
| Show on Archives | Display on category/tag pages | On |
| Show on Search | Display on search results | On |

#### Appearance (NEW in v1.3.0)

| Setting | Description | Default |
|---------|-------------|---------|
| **Button Shape** | Circle / Square / Rounded / Pill / Pentagon / Hexagon | Circle |
| **Animation Style** | Fade / Slide / Scale / Bounce / Rotate / Flip | Fade |
| Position | Bottom Right / Bottom Left | Right |
| Button Size | Size in pixels (24-80) | 48px |
| Background Color | Button background color | #111111 |
| Icon Color | Arrow icon color | #ffffff |
| Bottom Offset | Distance from bottom (8-100px) | 24px |
| Side Offset | Distance from side (8-100px) | 24px |

#### Behavior (NEW in v1.3.0)

| Setting | Description | Default |
|---------|-------------|---------|
| **Hide on Scroll Down** | Auto-hide when scrolling down | Off |

#### Progress Ring

| Setting | Description | Default |
|---------|-------------|---------|
| Enable Progress Ring | Show scroll progress | Off |
| Progress Color | Ring foreground color | #007cba |
| Ring Width | Thickness in pixels (1-10) | 3px |
| Background Color | Ring background (supports rgba) | rgba(255,255,255,0.2) |

---

## 🎭 Demo

### Shape Examples

**Try all 6 shapes:**
- Circle: Classic and universally recognized
- Square: Modern, sharp aesthetic
- Rounded Square: Friendly and approachable
- Pill: Sleek capsule design
- Pentagon: Unique geometric shape
- Hexagon: Technical, modern look

### Animation Examples

**Experience all 6 animations:**
- Fade: Smooth, subtle entrance
- Slide: Directional slide-up
- Scale: Dynamic zoom effect
- Bounce: Playful and energetic
- Rotate: Spinning entrance
- Flip: Dramatic 3D effect

### Hide on Scroll Demo

**See the smart behavior:**
1. Scroll down → Button hides
2. Scroll up → Button appears
3. Reduces clutter during reading
4. Smooth transitions

---

## 🛠️ Development

### Requirements

- WordPress 5.6+
- PHP 7.2+
- Modern browser with ES6+ support

### Local Setup

```bash
# Clone repository
git clone https://github.com/wpdevup/tap-top.git
cd tap-top

# No build process needed - it's pure PHP/JS/CSS!
# Just symlink to your WordPress plugins directory:
ln -s $(pwd) /path/to/wordpress/wp-content/plugins/tap-top

# Or copy the folder:
cp -r . /path/to/wordpress/wp-content/plugins/tap-top
```

### File Structure (Updated v1.3.0)

```
tap-top/
├── assets/
│   ├── css/
│   │   ├── taptop.css              # Frontend styles (UPDATED: shapes & animations)
│   │   ├── taptop-admin.css        # Admin panel styles
│   │   └── taptop-block.css        # Block editor styles
│   └── js/
│       ├── taptop.js               # Main script (UPDATED: hide on scroll)
│       ├── taptop-admin.js         # Admin panel functionality
│       └── taptop-block.js         # Gutenberg block (UPDATED: new options)
├── includes/
│   ├── class-taptop-settings.php   # Settings page (UPDATED: new options)
│   └── class-taptop-block.php      # Block registration (UPDATED)
├── languages/
│   └── tap-top.pot                 # Translation template
├── tap-top.php                     # Main plugin file (v1.3.0)
├── readme.txt                      # WordPress.org readme (UPDATED)
├── README.md                       # This file (UPDATED)
├── LICENSE                         # GPL-2.0+ license
└── uninstall.php                   # Cleanup on uninstall
```

---

## 📝 Changelog

### 1.3.0 - 2025-01-20

**🎉 Major Feature Release**

**New Features:**
- ✨ **6 Unique Button Shapes** - Circle, Square, Rounded Square, Pill, Pentagon, Hexagon
- ✨ **6 Smooth Animation Styles** - Fade, Slide, Scale, Bounce, Rotate, Flip (3D)
- ✨ **Hide on Scroll Down** - Smart auto-hide behavior for improved UX

**Improvements:**
- 🎨 Enhanced CSS with shape-specific styling and clip-path support
- ⚡ Optimized animations with GPU acceleration
- 📱 Better mobile performance with shape rendering
- 🔧 Improved animation transitions with prefers-reduced-motion support
- 💫 Smooth state transitions for hide-on-scroll feature

**Technical:**
- New CSS classes for shapes: `.shape-circle`, `.shape-square`, `.shape-rounded-square`, `.shape-pill`, `.shape-pentagon`, `.shape-hexagon`
- New animation classes: `.anim-fade`, `.anim-slide`, `.anim-scale`, `.anim-bounce`, `.anim-rotate`, `.anim-flip`
- Smart scroll direction detection for hide-on-scroll
- Enhanced Gutenberg block with shape and animation previews
- Full backward compatibility with v1.2.x

**Compatibility:**
- WordPress 5.6+ (tested up to 6.8)
- PHP 7.2+
- All modern browsers with CSS clip-path support
- Graceful degradation for older browsers

### 1.2.0 - 2025-01-15

**✨ Major Release - WordPress.org Approved**

**New Features:**
- ✨ Universal anchor link fixes - works across all scroll libraries
- ✨ Advanced scroll library detection (Lenis, Locomotive, SmoothScrollbar)
- ✨ Adaptive obstruction avoidance system
- ✨ Full Gutenberg block integration with Site Editor support
- ✨ Three display modes (Global, Block-Only, Hybrid)
- ✨ Scroll progress ring with accessibility support
- ✨ Mobile safe-area support for notched devices
- ✨ WCAG 2.1 AA accessibility compliance

**Improvements:**
- 🚀 Performance optimizations (lazy loading, efficient animations)
- 🎨 Modern CSS with custom properties and forced-colors support
- 📱 Mobile-first responsive design
- 🔧 Better WordPress coding standards compliance
- 📚 Complete documentation with examples

### 1.1.0 - 2024-10-01
- Initial release with basic functionality

[View full changelog →](https://wordpress.org/plugins/tap-top/#developers)

---

## 📄 License

This project is licensed under the **GNU General Public License v2.0 or later**.

```
Copyright (C) 2024-2025 iruserwp9

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.
```

See [LICENSE](LICENSE) file for full details.

---

## 🔗 Links

- **Official Plugin:** [WordPress.org](https://wordpress.org/plugins/tap-top/)
- **Support Forum:** [Get Help](https://wordpress.org/support/plugin/tap-top/)
- **Reviews:** [Rate on WordPress.org](https://wordpress.org/support/plugin/tap-top/reviews/)
- **Changelog:** [Version History](https://wordpress.org/plugins/tap-top/#developers)
- **Report Issues:** [GitHub Issues](https://github.com/wpdevup/tap-top/issues)

---

## 💖 Support the Project

If you find Tap Top useful, please consider:

- ⭐ **Star this repository** - Show your support
- 🐛 **Report bugs** - Help improve the plugin
- 💡 **Suggest features** - Share your ideas
- ✍️ **Write a review** - Help others discover Tap Top
- 🌍 **Translate** - Make it available in your language

---

## 🙏 Acknowledgments

Built with:
- ❤️ Love for WordPress community
- 🎨 Inspiration from modern web design
- 🔧 Feedback from real users
- 📚 WordPress Coding Standards
- ♿ WCAG Accessibility Guidelines

Special thanks to:
- All contributors and beta testers
- WordPress Plugin Review Team
- Scroll library maintainers (Lenis, Locomotive, SmoothScrollbar)
- Everyone who provided feedback and suggestions
- Design inspiration from modern web applications

---

## 📮 Contact

- **Author:** iruserwp9
- **WordPress Profile:** [https://profiles.wordpress.org/iruserwp9/](https://profiles.wordpress.org/iruserwp9/)
- **Support:** [WordPress.org Support Forum](https://wordpress.org/support/plugin/tap-top/)

---

<div align="center">

**Made with ❤️ for the WordPress community**

**Version 1.3.0 - Now with 6 Unique Shapes & Smooth Animations!**

[⬆ Back to Top](#tap-top--advanced-back-to-top-button-for-wordpress)

</div>
