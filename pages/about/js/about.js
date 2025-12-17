/**
 * About Page Specific JavaScript
 * This file contains functionality specific to the about page
 */

(function() {
    'use strict';
    
    // ========================================
    // About Page Initialization
    // ========================================
    
    function initAboutPage() {
        console.log('About page initialized');
        
        // Add animation observers
        observeElements();
        
        // Initialize skill card interactions
        initSkillCards();
    }
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    
    function observeElements() {
        // Only run if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            return;
        }
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // ========================================
    // Skill Cards Interaction
    // ========================================
    
    function initSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.03)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Add click to expand functionality (optional)
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }
    
    // ========================================
    // Smooth Reveal on Scroll
    // ========================================
    
    function addScrollReveal() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // ========================================
    // Analytics (Example - implement as needed)
    // ========================================
    
    function trackPageView() {
        // Example: Track page view
        console.log('About page viewed');
        
        // If using analytics:
        // gtag('event', 'page_view', { page_path: '/pages/about' });
    }
    
    // ========================================
    // Run on Page Load
    // ========================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAboutPage();
            addScrollReveal();
            trackPageView();
        });
    } else {
        initAboutPage();
        addScrollReveal();
        trackPageView();
    }
    
})();
