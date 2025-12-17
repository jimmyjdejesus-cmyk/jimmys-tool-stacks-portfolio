# Pages Directory

This directory contains static pages with a modern, organized structure following web development best practices.

## 📁 Directory Structure

```
pages/
├── css/                    # Global styles shared across all pages
│   └── main.css           # Main stylesheet with base styles
├── js/                     # Global JavaScript shared across all pages
│   └── main.js            # Main script with utility functions
├── html/                   # Reusable HTML components (optional)
│
├── template.html          # Template file for creating new pages
│
├── about/                 # About page directory
│   ├── html/             # HTML files for about page
│   │   └── about.html
│   ├── css/              # About page specific styles
│   │   └── about.css
│   └── js/               # About page specific scripts
│       └── about.js
│
├── example-page/         # Example page demonstrating structure
│   ├── html/
│   │   └── example-page.html
│   ├── css/
│   │   └── example-page.css
│   └── js/
│       └── example-page.js
│
└── [page-name]/          # Template for new pages
    ├── html/
    │   └── [page-name].html
    ├── css/
    │   └── [page-name].css
    └── js/
        └── [page-name].js
```

## 🚀 Quick Start

### Creating a New Page

1. **Copy the template structure:**
   ```bash
   mkdir -p pages/my-page/html pages/my-page/css pages/my-page/js
   ```

2. **Copy and customize template.html:**
   ```bash
   cp pages/template.html pages/my-page/html/my-page.html
   ```

3. **Create page-specific CSS:**
   ```bash
   touch pages/my-page/css/my-page.css
   ```

4. **Create page-specific JS:**
   ```bash
   touch pages/my-page/js/my-page.js
   ```

5. **Edit the HTML file** to include your page-specific CSS and JS:
   ```html
   <!-- In the <head> section -->
   <link rel="stylesheet" href="../css/my-page.css">
   
   <!-- Before closing </body> tag -->
   <script src="../js/my-page.js"></script>
   ```

## 📋 File Organization Rules

### Global Files (Root Level)

- **css/main.css**: Base styles, typography, layout, components used across all pages
- **js/main.js**: Utility functions, navigation, common functionality
- **template.html**: Starting template for new pages

### Page-Specific Files (Subdirectories)

- **html/**: Contains the HTML file(s) for the page
- **css/**: Page-specific styles that don't belong in global CSS
- **js/**: Page-specific JavaScript functionality

## 🎯 Best Practices

### HTML Best Practices

1. **Use semantic HTML5 elements**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
2. **Include proper meta tags**: charset, viewport, description, author
3. **Add accessibility features**: ARIA labels, skip links, alt text
4. **Use proper heading hierarchy**: h1 → h2 → h3 (don't skip levels)
5. **Include Open Graph tags** for social media sharing

### CSS Best Practices

1. **Keep global styles in main.css**: Reset, typography, layout, shared components
2. **Page-specific styles in subdirectory CSS**: Unique styling for that page only
3. **Use CSS custom properties** (CSS variables) for theme colors
4. **Mobile-first approach**: Design for mobile, enhance for desktop
5. **Avoid !important**: Write specific selectors instead
6. **Use BEM or similar naming convention** for class names
7. **Group related styles** with comments

### JavaScript Best Practices

1. **Global utilities in main.js**: DOM helpers, common functions
2. **Page-specific code in subdirectory JS**: Features unique to that page
3. **Use strict mode**: `'use strict';` at the top of files
4. **Wrap in IIFE** to avoid global scope pollution: `(function() { ... })();`
5. **Check for DOM elements** before accessing them
6. **Add event listeners properly**: Use `addEventListener()`
7. **Consider performance**: Debounce/throttle scroll/resize handlers
8. **Progressive enhancement**: Works without JS, better with it

## 💡 Template Usage

The `template.html` file includes:

- ✅ Proper HTML5 structure
- ✅ Meta tags for SEO and social media
- ✅ Accessibility features (skip links, ARIA labels)
- ✅ Links to global and page-specific CSS/JS
- ✅ Semantic HTML5 elements
- ✅ Responsive navigation
- ✅ Example sections and components
- ✅ Commented code for guidance

## 🎨 Styling Guidelines

### Global Styles (main.css)

Includes:
- CSS Reset
- Typography system
- Color scheme (gradient theme)
- Layout components (container, grid)
- Shared components (cards, buttons, forms)
- Utility classes
- Responsive breakpoints
- Print styles

### Page-Specific Styles

Add only styles unique to that page:
```css
/* Good - Page-specific */
.about-intro {
    background: linear-gradient(...);
}

/* Bad - Should be in main.css */
.container {
    max-width: 1200px;
}
```

## 🔧 JavaScript Guidelines

### Global Scripts (main.js)

Includes:
- DOM utility functions (`$`, `$$`)
- Navigation management
- Smooth scrolling
- Form validation helpers
- Loading state management
- Accessibility helpers (focus trap)
- Performance utilities (debounce, throttle)

### Page-Specific Scripts

Add only functionality unique to that page:
```javascript
// Good - Page-specific
function initAboutPage() {
    // About page specific code
}

// Bad - Should be in main.js
function $(selector) {
    return document.querySelector(selector);
}
```

## 📱 Responsive Design

All pages are mobile-first and responsive:

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

Breakpoints defined in `main.css`:
```css
@media (max-width: 768px) { /* Tablet and below */ }
@media (max-width: 480px) { /* Mobile */ }
```

## ♿ Accessibility

All pages include:

- Skip to main content links
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Semantic HTML
- Alt text for images
- Color contrast compliance

## 🔗 Linking Between Pages

Use relative paths from the HTML file location:

```html
<!-- From pages/about/html/about.html -->
<a href="../../../index.html">Home</a>
<a href="../../../portfolio/index.html">Portfolio</a>
<a href="../../example-page/html/example-page.html">Example</a>

<!-- Global CSS -->
<link rel="stylesheet" href="../../css/main.css">

<!-- Page CSS -->
<link rel="stylesheet" href="../css/about.css">
```

## 📦 What Goes Where?

### In main.css:
- CSS reset
- Typography
- Colors and themes
- Layout (container, grid)
- Shared components (buttons, cards, forms)
- Utility classes
- Responsive breakpoints

### In page CSS:
- Page-specific layouts
- Unique components not used elsewhere
- Page-specific animations
- Override global styles (if needed)

### In main.js:
- DOM utilities
- Common event handlers
- Shared functions
- Navigation logic
- Form validation helpers

### In page JS:
- Page-specific interactions
- Unique functionality
- Page initialization
- Custom event handlers

## 🚨 Common Mistakes to Avoid

1. ❌ Putting everything in one file
2. ❌ Mixing global and page styles without organization
3. ❌ Inline styles and scripts (use external files)
4. ❌ Not using semantic HTML
5. ❌ Forgetting responsive design
6. ❌ Ignoring accessibility
7. ❌ Not testing on multiple devices
8. ❌ Hardcoding values instead of using CSS variables

## ✅ Checklist for New Pages

- [ ] Create directory structure (html/, css/, js/)
- [ ] Copy and customize template.html
- [ ] Update page title and meta tags
- [ ] Add page-specific CSS file
- [ ] Add page-specific JS file (if needed)
- [ ] Link CSS and JS files correctly
- [ ] Update navigation links
- [ ] Test on mobile devices
- [ ] Check accessibility
- [ ] Validate HTML
- [ ] Test all interactive features
- [ ] Update this README if needed

## 📚 Examples

See the following for reference:
- **template.html**: Base template with all features
- **about/**: Complete example with HTML, CSS, and JS
- **example-page/**: Demonstrates the directory structure

## 🔄 Migration from Old Structure

If you have existing pages without this structure:

1. Create the new directory structure
2. Move HTML to `[page]/html/`
3. Extract inline CSS to `[page]/css/`
4. Extract inline JS to `[page]/js/`
5. Update links to global CSS/JS
6. Test thoroughly

## 💼 Page Types to Create

Suggested pages for the portfolio:

- **about/**: Professional bio and background
- **skills/**: Technical skills and competencies
- **projects/**: Detailed project showcases
- **contact/**: Contact information and form
- **resources/**: Learning resources and links
- **resume/**: Downloadable resume/CV
- **testimonials/**: Client/colleague testimonials

---

**Remember**: Keep it simple, organized, and maintainable. This structure grows with your portfolio! 🚀
