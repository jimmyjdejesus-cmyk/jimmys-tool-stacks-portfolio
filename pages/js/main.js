/**
 * Main JavaScript - Global Functionality
 * This file contains shared functionality used across all pages
 * Page-specific scripts should be in their own JS files
 */

// ========================================
// Utility Functions
// ========================================

/**
 * Safely query a DOM element
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * Safely query multiple DOM elements
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Add event listener with error handling
 * @param {Element} element - DOM element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 */
function addEvent(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

// ========================================
// Navigation Management
// ========================================

/**
 * Highlight active navigation item based on current page
 */
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = $$('nav a');
    
    navLinks.forEach(link => {
        try {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (currentPath === linkPath || currentPath.startsWith(linkPath.replace(/\/$/, ''))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        } catch (e) {
            // Invalid URL, skip
            console.warn('Invalid URL for nav link:', link.href);
        }
    });
}

// ========================================
// Smooth Scrolling
// ========================================

/**
 * Enable smooth scrolling for anchor links
 */
function enableSmoothScroll() {
    const anchorLinks = $$('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        addEvent(link, 'click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = $(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without triggering scroll
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// ========================================
// Theme Management (Optional)
// ========================================

/**
 * Get user's preferred theme
 * @returns {string} 'light' or 'dark'
 */
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Set theme
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// ========================================
// Form Validation
// ========================================

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show form error message
 * @param {Element} field - Form field element
 * @param {string} message - Error message
 */
function showError(field, message) {
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.display = 'block';
    errorElement.style.marginTop = '5px';
    
    // Remove existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.parentElement.appendChild(errorElement);
    field.classList.add('error');
    field.style.borderColor = 'red';
}

/**
 * Clear form error message
 * @param {Element} field - Form field element
 */
function clearError(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
    field.style.borderColor = '';
}

// ========================================
// Loading State Management
// ========================================

/**
 * Show loading indicator
 * @param {Element} element - Element to show loading state on
 */
function showLoading(element) {
    if (!element) return;
    element.classList.add('loading');
    element.setAttribute('disabled', 'disabled');
    const originalText = element.textContent;
    element.setAttribute('data-original-text', originalText);
    element.textContent = 'Loading...';
}

/**
 * Hide loading indicator
 * @param {Element} element - Element to hide loading state from
 */
function hideLoading(element) {
    if (!element) return;
    element.classList.remove('loading');
    element.removeAttribute('disabled');
    const originalText = element.getAttribute('data-original-text');
    if (originalText) {
        element.textContent = originalText;
        element.removeAttribute('data-original-text');
    }
}

// ========================================
// Accessibility Helpers
// ========================================

/**
 * Trap focus within an element (useful for modals)
 * @param {Element} element - Element to trap focus within
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
        
        if (e.key === 'Escape') {
            element.dispatchEvent(new CustomEvent('escape-pressed'));
        }
    });
}

// ========================================
// Performance Utilities
// ========================================

/**
 * Debounce function - Limits the rate at which a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - Ensures a function is called at most once in a specified time period
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function}
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Initialization
// ========================================

/**
 * Initialize global functionality when DOM is ready
 */
function init() {
    console.log('Portfolio site initialized');
    
    // Highlight active navigation
    highlightActiveNav();
    
    // Enable smooth scrolling
    enableSmoothScroll();
    
    // Add animation class to body for CSS transitions
    document.body.classList.add('loaded');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// Export for module usage (if needed)
// ========================================

// Uncomment if using ES6 modules
// export {
//     $,
//     $$,
//     addEvent,
//     highlightActiveNav,
//     enableSmoothScroll,
//     isValidEmail,
//     showError,
//     clearError,
//     showLoading,
//     hideLoading,
//     trapFocus,
//     debounce,
//     throttle
// };
