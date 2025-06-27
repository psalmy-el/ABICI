// Initialize about page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system using global manager
    if (window.languageManager) {
        // Setup the language toggle button
        window.languageManager.setupLanguageToggle();
        
        // Translate the page based on current language
        window.languageManager.translatePage();
        
        // Update page title based on current language
        updatePageTitle();
        
        console.log('About page language system initialized');
        console.log('Current language:', window.languageManager.getCurrentLanguage());
    } else {
        console.error('Global language manager not found! Make sure to include the language manager script first.');
    }
    
    // Setup other page functionality
    setupMobileMenu();
    setupSmoothScrolling();
    setupScrollEffects();
    setupAnimations();
});

// Update page title based on current language
function updatePageTitle() {
    const currentLang = window.languageManager.getCurrentLanguage();
    if (currentLang === 'sv') {
        document.title = 'Om ABICI - Ledande Revisions- och Managementkonsultföretag';
    } else {
        document.title = 'About ABICI - Leading Audit & Management Consultancy';
    }
}

// Mobile menu setup
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
    }
}

// Smooth scrolling setup
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects setup
function setupScrollEffects() {
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
}