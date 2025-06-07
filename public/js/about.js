// Language toggle functionality
let currentLanguage = 'sv'; // Default to Swedish

function toggleLanguage() {
    currentLanguage = currentLanguage === 'sv' ? 'en' : 'sv';
    console.log('Toggling to language:', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    console.log('Updating language to:', currentLanguage);
    
    // Get all elements with language attributes
    const allElements = document.querySelectorAll('[data-en], [data-sv]');
    console.log('Found elements with language attributes:', allElements.length);
    
    allElements.forEach((element, index) => {
        const text = element.getAttribute('data-' + currentLanguage);
        if (text) {
            console.log(`Element ${index}: ${element.tagName} - Old text: "${element.textContent}" - New text: "${text}"`);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });

    // Update language indicator
    const langIndicator = document.getElementById('lang-indicator');
    if (langIndicator) {
        langIndicator.textContent = currentLanguage.toUpperCase();
        console.log('Updated language indicator to:', currentLanguage.toUpperCase());
    }
    
    // Update document language and title
    document.documentElement.lang = currentLanguage;
    if (currentLanguage === 'sv') {
        document.title = 'Om ABICI - Ledande Revisions- och Managementkonsultföretag';
    } else {
        document.title = 'About ABICI - Leading Audit & Management Consultancy';
    }
    
    console.log('Language update complete. Current language:', currentLanguage);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to language toggle button
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Language toggle button clicked!');
            toggleLanguage();
        });
        console.log('Language toggle event listener added');
    } else {
        console.log('Language toggle button not found!');
    }
    
    updateLanguage();
    
    // Smooth scrolling for navigation links
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

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.mvv-card, .team-card, .why-item, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(el, target) {
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                const originalText = el.textContent;
                let suffix = '';
                if (originalText.includes('%')) suffix = '%';
                else if (originalText.includes('+')) suffix = '+';
                else if (originalText.includes('$')) suffix = '';
                
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                const originalText = el.textContent;
                let suffix = '';
                if (originalText.includes('%')) suffix = '%';
                else if (originalText.includes('+')) suffix = '+';
                else if (originalText.includes('$')) suffix = '';
                
                el.textContent = Math.floor(count) + suffix;
            }
        }, 20);
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => {
                    const text = num.textContent;
                    const target = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(target)) {
                        animateCounter(num, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});