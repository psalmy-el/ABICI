// Updated abici.js - Main page JavaScript with global language management

// Global variables
let isScrolled = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupLanguageSystem(); // Setup language first before other systems
    setupScrollEffects();
    setupMobileMenu();
    setupSmoothScrolling();
    setupFormHandling();
    setupAnimations();
    setupHeroButtons();
}

// Setup language system using global manager
function setupLanguageSystem() {
    // Use the global language manager
    if (window.languageManager) {
        // Setup the language toggle button
        window.languageManager.setupLanguageToggle();
        
        // Translate the page based on current language
        window.languageManager.translatePage();
        
        console.log('Language system initialized with global manager');
        console.log('Current language:', window.languageManager.getCurrentLanguage());
    } else {
        console.error('Global language manager not found! Make sure to include the language manager script first.');
    }
}

// Setup hero buttons functionality
function setupHeroButtons() {
    const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
    const learnMoreBtn = document.querySelector('.hero-buttons .btn-secondary');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Scroll effects
function setupScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
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
    
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
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

// Smooth scrolling setup
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
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
    
    // Get current language from global manager
    const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'sv';
    formValues.language = currentLanguage;
    
    console.log('Form submission with language:', currentLanguage, formValues);
    
    // Validate form first
    if (!validateForm(formValues)) {
        showMessage('error', currentLanguage === 'en' ? 'Please fill in all required fields.' : 'Vänligen fyll i alla obligatoriska fält.');
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = currentLanguage === 'en' ? 'Sending...' : 'Skickar...';
    
    try {
        // Send data to your backend server
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Show success message
            showMessage('success', currentLanguage === 'en' ? 
                'Message sent successfully! We will get back to you within 24 hours.' : 
                'Meddelandet skickades framgångsrikt! Vi återkommer till dig inom 24 timmar.');
            
            // Reset form
            e.target.reset();
            
            console.log('Form submitted successfully:', formValues);
        } else {
            // Show error message from server
            showMessage('error', result.message || (currentLanguage === 'en' ? 
                'Failed to send message. Please try again.' : 
                'Misslyckades att skicka meddelandet. Försök igen.'));
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('error', currentLanguage === 'en' ? 
            'Network error. Please check your connection and try again.' : 
            'Nätverksfel. Kontrollera din anslutning och försök igen.');
    } finally {
        // Reset button state
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
    // Create message element
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
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds (longer for error messages)
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

// Newsletter subscription handler
function setupNewsletterHandling() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    // Get current language from global manager
    const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'sv';
    
    if (!isValidEmail(email)) {
        showMessage('error', currentLanguage === 'en' ? 
            'Please enter a valid email address.' : 
            'Ange en giltig e-postadress.');
        return;
    }
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = currentLanguage === 'en' ? 'Subscribing...' : 'Prenumererar...';
    
    try {
        const response = await fetch('/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email, 
                language: currentLanguage
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showMessage('success', currentLanguage === 'en' ? 
                'Successfully subscribed to newsletter!' : 
                'Framgångsrikt prenumererat på nyhetsbrevet!');
            e.target.reset();
        } else {
            showMessage('error', result.message || (currentLanguage === 'en' ? 
                'Failed to subscribe. Please try again.' : 
                'Misslyckades att prenumerera. Försök igen.'));
        }
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        showMessage('error', currentLanguage === 'en' ? 
            'Network error. Please try again.' : 
            'Nätverksfel. Försök igen.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// Animation setup
function setupAnimations() {
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.service-card, .expertise-card, .about-text, .about-image');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Counter animation for stats
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200; // Animation speed
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
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
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function formatCounterValue(value) {
    if (value >= 500) return '500+';
    if (value >= 98) return '98%';
    if (value >= 15) return '15+';
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

// Initialize all form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFormHandling();
    setupNewsletterHandling();
    setupAnimations();
});

// Add loading class when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loading');
});

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Handle any resize-specific logic here
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}, 250));

// Debug function to test language switching
window.debugLanguage = function() {
    if (window.languageManager) {
        console.log('Current language:', window.languageManager.getCurrentLanguage());
        console.log('Available translations:', Object.keys(window.translations));
        console.log('Elements with data attributes:', document.querySelectorAll('[data-en], [data-sv]').length);
        
        // Test language toggle
        console.log('Testing language toggle...');
        window.languageManager.toggleLanguage();
    } else {
        console.error('Global language manager not available');
    }
};