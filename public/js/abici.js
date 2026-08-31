// Updated abici.js - Traditional scrolling website with smooth navigation
// Global variables
let isScrolled = false;
let currentSection = 'home'; // Track current active section

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupLanguageSystem();
    setupScrollEffects();
    setupMobileMenu();
    setupSmoothScrolling(); // Changed back to smooth scrolling
    setupFormHandling();
    setupAnimations();
    setupHeroButtons();
    // Remove initializeSectionDisplay() - let all sections be visible
}

// Setup smooth scrolling navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Handle footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Setup scroll spy for active nav links
    setupScrollSpy();
}

// Handle smooth scroll navigation
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = e.target.getAttribute('href').substring(1); // Remove #
    const targetSection = document.getElementById(targetId);
    
    if (!targetSection) {
        console.warn(`Section with ID "${targetId}" not found`);
        return;
    }
    
    // Calculate offset for fixed navbar
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = targetSection.offsetTop - navbarHeight;
    
    // Smooth scroll to target
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Update current section
    currentSection = targetId;
    updateActiveNavLink(targetId);
    
    // Close mobile menu if open
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Setup scroll spy to highlight active nav links
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (current && current !== currentSection) {
            currentSection = current;
            updateActiveNavLink(current);
        }
    });
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Setup language system using global manager
function setupLanguageSystem() {
    if (window.languageManager) {
        window.languageManager.setupLanguageToggle();
        window.languageManager.translatePage();
        console.log('Language system initialized with global manager');
    } else {
        console.error('Global language manager not found!');
    }
}

// Setup hero buttons functionality - updated for smooth scrolling
function setupHeroButtons() {
    const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
    const learnMoreBtn = document.querySelector('.hero-buttons .btn-secondary');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = contactSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = aboutSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Scroll effects
function setupScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    if (scrollTop > 50 && !isScrolled) {
        navbar.classList.add('scrolled');
        isScrolled = true;
    } else if (scrollTop <= 50 && isScrolled) {
        navbar.classList.remove('scrolled');
        isScrolled = false;
    }
    
    // Animate fade-in elements as they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
    
    // Animate counters when about section is in view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        if (aboutTop < window.innerHeight / 2 && aboutTop > -aboutSection.offsetHeight / 2) {
            // Only animate counters once
            if (!aboutSection.dataset.animated) {
                animateCounters();
                aboutSection.dataset.animated = 'true';
            }
        }
    }
}

// Mobile menu setup
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Form handling 
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    
    const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'sv';
    formValues.language = currentLanguage;
    
    if (!validateForm(formValues)) {
        showMessage('error', currentLanguage === 'en' ? 'Please fill in all required fields.' : 'Vänligen fyll i alla obligatoriska fält.');
        return;
    }
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = currentLanguage === 'en' ? 'Sending...' : 'Skickar...';
    
    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showMessage('success', currentLanguage === 'en' ? 
                'Message sent successfully! We will get back to you within 24 hours.' : 
                'Meddelandet skickades framgångsrikt! Vi återkommer till dig inom 24 timmar.');
            e.target.reset();
        } else {
            showMessage('error', result.message || (currentLanguage === 'en' ? 
                'Failed to send message. Please try again.' : 
                'Misslyckades att skicka meddelandet. Försök igen.'));
        }
    } catch (error) {
        showMessage('error', currentLanguage === 'en' ? 
            'Network error. Please check your connection and try again.' : 
            'Nätverksfel. Kontrollera din anslutning och försök igen.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

function validateForm(values) {
    return values.name && values.email && values.message && isValidEmail(values.email);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    const removeDelay = type === 'error' ? 7000 : 5000;
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, removeDelay);
}

// Animation setup
function setupAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .expertise-card, .about-text, .about-image');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / speed;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = formatCounterValue(target);
                clearInterval(timer);
            } else {
                counter.textContent = formatCounterValue(Math.ceil(current));
            }
        }, 1);
    });
}

function formatCounterValue(value) {
    if (value >= 50) return '50+';
    if (value >= 98) return '98%';
    if (value >= 30) return '30+';
    return value.toString();
}

// Utility functions
function debounce(func, wait) {
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

// Handle resize events
window.addEventListener('resize', debounce(() => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}, 250));

// Add page loading effect
window.addEventListener('load', () => {
    document.body.classList.add('loading');
});

// API for external navigation (updated for smooth scrolling)
window.navigateToSection = function(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        updateActiveNavLink(sectionId);
    }
};

// Get current section
window.getCurrentSection = function() {
    return currentSection;
};

// Debug function
window.debugNavigation = function() {
    console.log('Current section:', currentSection);
    console.log('Available sections:', Array.from(document.querySelectorAll('section[id]')).map(s => s.id));
    console.log('Scroll position:', window.pageYOffset);
};