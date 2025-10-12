# Tap Top – Advanced Back to Top Button for WordPress

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
4. Customize colors, position, and size
5. Save changes

The button will now appear site-wide based on your settings.

#### Using Gutenberg Blocks

1. Edit any post or page
2. Add **Tap Top Button** block
3. Customize in block settings panel:
   - Colors (background, icon, progress ring)
   - Position (left or right)
   - Size and offsets
   - Enable/disable progress ring
4. Publish the page

Each block has independent settings.

#### Using Hybrid Mode

1. Set **Display Mode** to **Hybrid Mode**
2. Configure global settings as default
3. Add blocks to specific pages to override
4. Pages with blocks use block settings
5. Pages without blocks use global settings

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

#### Appearance

| Setting | Description | Default |
|---------|-------------|---------|
| Position | Bottom Right / Bottom Left | Right |
| Button Size | Size in pixels (24-80) | 48px |
| Background Color | Button background color | #111111 |
| Icon Color | Arrow icon color | #ffffff |
| Bottom Offset | Distance from bottom (8-100px) | 24px |
| Side Offset | Distance from side (8-100px) | 24px |

#### Progress Ring

| Setting | Description | Default |
|---------|-------------|---------|
| Enable Progress Ring | Show scroll progress | Off |
| Progress Color | Ring foreground color | #007cba |
| Ring Width | Thickness in pixels (1-10) | 3px |
| Background Color | Ring background (supports rgba) | rgba(255,255,255,0.2) |

---

### Supported Scroll Libraries

#### Lenis

```javascript
// Tap Top automatically detects and uses:
lenis.scrollTo(0, {
  duration: 0.6,
  easing: (t) => 1 - Math.pow(1 - t, 3)
});
```

**Tested with:** Lenis v1.0+

#### Locomotive Scroll

```javascript
// Automatically integrates with:
locomotive.scrollTo(0, {
  duration: 600,
  easing: [0.25, 0.00, 0.35, 1.00]
});
```

**Tested with:** Locomotive Scroll v4.x and v5.x

#### SmoothScrollbar

```javascript
// Uses native API:
scrollbar.scrollTo(0, 0, 600);
```

**Tested with:** SmoothScrollbar v8.x

#### Detection Example

```javascript
// The plugin automatically runs this on page load:
function detectScrollLibrary() {
  if (window.lenis) return { type: 'lenis', instance: window.lenis };
  if (window.locomotive) return { type: 'locomotive', instance: window.locomotive.scroll };
  if (window.Scrollbar) return { type: 'smoothscrollbar', instance: window.Scrollbar.getAll()[0] };
  return { type: 'native', instance: null };
}
```

---

### Developer Hooks

#### Filters

```php
// Modify global configuration
add_filter('taptop_global_config', function($config) {
    $config['size'] = 56;
    $config['position'] = 'left';
    return $config;
});

// Modify block attributes
add_filter('taptop_block_attributes', function($attributes) {
    $attributes['bgColor'] = '#ff0000';
    return $attributes;
});

// Control when assets load
add_filter('taptop_should_load', function($should_load) {
    return !is_page('checkout');
}, 10, 1);

// Programmatically exclude pages
add_filter('taptop_excluded_pages', function($excluded) {
    $excluded[] = 123; // Exclude post ID 123
    return $excluded;
});
```

#### Actions

```php
// Before button renders
add_action('taptop_before_button_render', function() {
    // Your code here
});

// After assets enqueue
add_action('taptop_after_assets_enqueue', function() {
    // Your code here
});
```

---

### Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| iOS Safari | 14+ | ✅ Fully Supported |
| Android Chrome | 90+ | ✅ Fully Supported |

**Legacy browsers:** Graceful degradation with instant scroll fallback.

---

## 🎭 Demo

### Live Examples

### Try It Yourself

1. Install the plugin on a test site
2. Add a Lenis/Locomotive scroll library
3. Watch Tap Top automatically detect and integrate
4. Test anchor links - they work perfectly!

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

### Development Workflow

```bash
# 1. Enable debugging in wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);

# 2. Make your changes to:
# - PHP files in includes/
# - JavaScript files in assets/js/
# - CSS files in assets/css/

# 3. Test in browser with console open

# 4. Check for JavaScript errors:
# Open DevTools → Console

# 5. Check for PHP errors:
# wp-content/debug.log
```

### File Structure

```
tap-top/
├── assets/
│   ├── css/
│   │   ├── taptop.css              # Frontend styles
│   │   ├── taptop-admin.css        # Admin panel styles
│   │   └── taptop-block.css        # Block editor styles
│   └── js/
│       ├── taptop.js               # Main frontend script
│       ├── taptop-admin.js         # Admin panel functionality
│       └── taptop-block.js         # Gutenberg block
├── includes/
│   ├── class-taptop-settings.php   # Settings page
│   └── class-taptop-block.php      # Block registration
├── languages/
│   └── tap-top.pot                 # Translation template
├── tap-top.php                     # Main plugin file
├── readme.txt                      # WordPress.org readme
├── README.md                       # This file
├── LICENSE                         # GPL-2.0+ license
└── uninstall.php                   # Cleanup on uninstall
```

### Coding Standards

This plugin follows [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/):

```bash
# Install PHPCS and WPCS
composer global require wp-coding-standards/wpcs

# Check PHP files
phpcs --standard=WordPress includes/ tap-top.php

# Check JavaScript files
eslint assets/js/
```

### Testing Checklist

Before submitting changes:

- [ ] Test on clean WordPress installation
- [ ] Test with WP_DEBUG enabled
- [ ] Test with different themes
- [ ] Test with Lenis library
- [ ] Test with Locomotive Scroll
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Verify accessibility with screen reader
- [ ] Test keyboard navigation
- [ ] Check performance with Lighthouse

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

Found a bug? Please [open an issue](https://github.com/yourusername/tap-top/issues) with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- WordPress version
- PHP version
- Browser and version
- Any relevant console errors

### Suggesting Features

Have an idea? [Open an issue](https://github.com/wpdevup/tap-top/issues) with:

- Clear description of the feature
- Use case and benefits
- Any examples or mockups

### Pull Requests

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Test thoroughly
5. Commit with clear messages:
   ```bash
   git commit -m "Add amazing feature"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
7. Open a Pull Request with:
   - Description of changes
   - Testing performed
   - Screenshots (if UI changes)

### Translation

Help translate Tap Top into your language:

1. Copy `languages/tap-top.pot`
2. Use [Poedit](https://poedit.net/) to translate
3. Save as `tap-top-{locale}.po` and `tap-top-{locale}.mo`
4. Submit via Pull Request

---

## 📝 Changelog

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

**Bug Fixes:**
- 🐛 Fixed WordPress coding standards issues
- 🐛 Fixed Hybrid mode block detection
- 🐛 Fixed inline script implementation
- 🐛 Fixed settings save notification

**Technical:**
- Complete JavaScript rewrite for library detection
- New PHP class structure for blocks and settings
- Enhanced admin interface with search functionality
- Improved asset loading with conditional enqueueing
- Better integration with WordPress hooks

**Compatibility:**
- WordPress 5.6+ (tested up to 6.8)
- PHP 7.2+ requirement
- Modern browsers with ES6+ support
- All major page builders and themes

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

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
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

---

## 📮 Contact

- **Author:** iruserwp9
- **WordPress Profile:** [https://profiles.wordpress.org/iruserwp9/](https://profiles.wordpress.org/iruserwp9/)
- **Support:** [WordPress.org Support Forum](https://wordpress.org/support/plugin/tap-top/)

---

<div align="center">

**Made with ❤️ for the WordPress community**

[⬆ Back to Top](#tap-top--advanced-back-to-top-button-for-wordpress)

</div>
