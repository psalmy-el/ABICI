// Global variables
let currentLanguage = 'en';
let isScrolled = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupScrollEffects();
    setupMobileMenu();
    setupSmoothScrolling();
    setupFormHandling();
    setupAnimations();
    setupLanguageSystem();
}

// Language Translation System
const translations = {
    en: {
        // Navigation
        'Home': 'Home',
        'Services': 'Services',
        'About': 'About',
        'Expertise': 'Expertise',
        'Contact': 'Contact',
        
        // Hero Section
        'Transforming Business Excellence Through Strategic Leadership': 'Transforming Business Excellence Through Strategic Leadership',
        'As lead auditors and management consultants, we deliver data-driven insights and strategic solutions that drive sustainable growth and operational excellence.': 'As lead auditors and management consultants, we deliver data-driven insights and strategic solutions that drive sustainable growth and operational excellence.',
        'Get Started': 'Get Started',
        'Learn More': 'Learn More',
        
        // Services
        'Our Services': 'Our Services',
        'Comprehensive consulting solutions tailored to your business needs': 'Comprehensive consulting solutions tailored to your business needs',
        'Strategic Planning': 'Strategic Planning',
        'Develop comprehensive strategies that align with your vision and drive measurable results through data-driven decision making.': 'Develop comprehensive strategies that align with your vision and drive measurable results through data-driven decision making.',
        'Lead Auditing': 'Lead Auditing',
        'Expert audit services ensuring compliance, risk management, and operational efficiency across all business processes.': 'Expert audit services ensuring compliance, risk management, and operational efficiency across all business processes.',
        'Process Optimization': 'Process Optimization',
        'Streamline operations and eliminate inefficiencies to maximize productivity and reduce costs while maintaining quality.': 'Streamline operations and eliminate inefficiencies to maximize productivity and reduce costs while maintaining quality.',
        'Change Management': 'Change Management',
        'Guide your organization through transformation with structured approaches that ensure successful adoption and minimal disruption.': 'Guide your organization through transformation with structured approaches that ensure successful adoption and minimal disruption.',
        'Risk Management': 'Risk Management',
        'Identify, assess, and mitigate business risks while developing robust frameworks for ongoing risk monitoring and control.': 'Identify, assess, and mitigate business risks while developing robust frameworks for ongoing risk monitoring and control.',
        'Performance Enhancement': 'Performance Enhancement',
        'Boost organizational performance through targeted interventions, KPI optimization, and continuous improvement methodologies.': 'Boost organizational performance through targeted interventions, KPI optimization, and continuous improvement methodologies.',
        
        // About
        'About ABICI': 'About ABICI',
        'With decades of combined experience in management consulting and lead auditing, ABICI stands as a trusted partner for organizations seeking transformational change and sustainable growth.': 'With decades of combined experience in management consulting and lead auditing, ABICI stands as a trusted partner for organizations seeking transformational change and sustainable growth.',
        'Our expertise spans across industries, from Fortune 500 companies to emerging startups, delivering tailored solutions that drive measurable results and lasting impact.': 'Our expertise spans across industries, from Fortune 500 companies to emerging startups, delivering tailored solutions that drive measurable results and lasting impact.',
        'Projects Completed': 'Projects Completed',
        'Years Experience': 'Years Experience',
        'Client Satisfaction': 'Client Satisfaction',
        
        // Expertise
        'Our Expertise': 'Our Expertise',
        'Industry-leading knowledge across multiple sectors': 'Industry-leading knowledge across multiple sectors',
        'Financial Services': 'Financial Services',
        'Regulatory compliance, risk assessment, and performance optimization for financial institutions.': 'Regulatory compliance, risk assessment, and performance optimization for financial institutions.',
        'Healthcare': 'Healthcare',
        'Quality management, operational efficiency, and compliance auditing for healthcare organizations.': 'Quality management, operational efficiency, and compliance auditing for healthcare organizations.',
        'Technology': 'Technology',
        'Digital transformation, process automation, and strategic technology implementation.': 'Digital transformation, process automation, and strategic technology implementation.',
        'Manufacturing': 'Manufacturing',
        'Lean operations, supply chain optimization, and quality assurance systems.': 'Lean operations, supply chain optimization, and quality assurance systems.',
        
        // Contact
        'Get In Touch': 'Get In Touch',
        'Ready to transform your business? Let\'s discuss how ABICI can help you achieve your goals.': 'Ready to transform your business? Let\'s discuss how ABICI can help you achieve your goals.',
        'Send Message': 'Send Message',
        'Your Name': 'Your Name',
        'Your Email': 'Your Email',
        'Company Name': 'Company Name',
        'Your Message': 'Your Message',
        
        // Footer
        'Leading management consultancy delivering strategic excellence and audit leadership.': 'Leading management consultancy delivering strategic excellence and audit leadership.',
        'Follow Us': 'Follow Us',
        'All rights reserved.': 'All rights reserved.'
    },
    
    sv: {
        // Navigation
        'Home': 'Hem',
        'Services': 'Tjänster',
        'About': 'Om oss',
        'Expertise': 'Expertis',
        'Contact': 'Kontakt',
        
        // Hero Section
        'Transforming Business Excellence Through Strategic Leadership': 'Omvandlar Affärsexcellens Genom Strategiskt Ledarskap',
        'As lead auditors and management consultants, we deliver data-driven insights and strategic solutions that drive sustainable growth and operational excellence.': 'Som huvudrevisorer och managementkonsulter levererar vi datadrivna insikter och strategiska lösningar som driver hållbar tillväxt och operativ excellens.',
        'Get Started': 'Kom igång',
        'Learn More': 'Läs mer',
        
        // Services
        'Our Services': 'Våra Tjänster',
        'Comprehensive consulting solutions tailored to your business needs': 'Omfattande konsultlösningar skräddarsydda för dina affärsbehov',
        'Strategic Planning': 'Strategisk Planering',
        'Develop comprehensive strategies that align with your vision and drive measurable results through data-driven decision making.': 'Utveckla omfattande strategier som stämmer överens med din vision och driver mätbara resultat genom datadrivet beslutsfattande.',
        'Lead Auditing': 'Huvudrevision',
        'Expert audit services ensuring compliance, risk management, and operational efficiency across all business processes.': 'Expertrevisionstjänster som säkerställer efterlevnad, riskhantering och operativ effektivitet i alla affärsprocesser.',
        'Process Optimization': 'Processoptimering',
        'Streamline operations and eliminate inefficiencies to maximize productivity and reduce costs while maintaining quality.': 'Effektivisera verksamheten och eliminera ineffektivitet för att maximera produktiviteten och minska kostnaderna samtidigt som kvaliteten bibehålls.',
        'Change Management': 'Förändringsledning',
        'Guide your organization through transformation with structured approaches that ensure successful adoption and minimal disruption.': 'Vägled din organisation genom transformation med strukturerade tillvägagångssätt som säkerställer framgångsrik adoption och minimal störning.',
        'Risk Management': 'Riskhantering',
        'Identify, assess, and mitigate business risks while developing robust frameworks for ongoing risk monitoring and control.': 'Identifiera, bedöma och mildra affärsrisker samtidigt som robusta ramverk utvecklas för pågående riskövervakning och kontroll.',
        'Performance Enhancement': 'Prestandaförbättring',
        'Boost organizational performance through targeted interventions, KPI optimization, and continuous improvement methodologies.': 'Öka organisationens prestanda genom riktade interventioner, KPI-optimering och kontinuerliga förbättringsmetoder.',
        
        // About
        'About ABICI': 'Om ABICI',
        'With decades of combined experience in management consulting and lead auditing, ABICI stands as a trusted partner for organizations seeking transformational change and sustainable growth.': 'Med decennier av kombinerad erfarenhet inom managementkonsultation och huvudrevision står ABICI som en pålitlig partner för organisationer som söker transformativ förändring och hållbar tillväxt.',
        'Our expertise spans across industries, from Fortune 500 companies to emerging startups, delivering tailored solutions that drive measurable results and lasting impact.': 'Vår expertis sträcker sig över branscher, från Fortune 500-företag till framväxande startups, och levererar skräddarsydda lösningar som driver mätbara resultat och varaktig påverkan.',
        'Projects Completed': 'Genomförda Projekt',
        'Years Experience': 'Års Erfarenhet',
        'Client Satisfaction': 'Kundnöjdhet',
        
        // Expertise
        'Our Expertise': 'Vår Expertis',
        'Industry-leading knowledge across multiple sectors': 'Branschledande kunskap inom flera sektorer',
        'Financial Services': 'Finansiella Tjänster',
        'Regulatory compliance, risk assessment, and performance optimization for financial institutions.': 'Regelefterlevnad, riskbedömning och prestandaoptimering för finansiella institutioner.',
        'Healthcare': 'Hälsovård',
        'Quality management, operational efficiency, and compliance auditing for healthcare organizations.': 'Kvalitetsledning, operativ effektivitet och efterlevnadsrevision för vårdorganisationer.',
        'Technology': 'Teknologi',
        'Digital transformation, process automation, and strategic technology implementation.': 'Digital transformation, processautomation och strategisk teknikimplementering.',
        'Manufacturing': 'Tillverkning',
        'Lean operations, supply chain optimization, and quality assurance systems.': 'Lean-verksamhet, optimering av leveranskedjan och kvalitetssäkringssystem.',
        
        // Contact
        'Get In Touch': 'Kontakta Oss',
        'Ready to transform your business? Let\'s discuss how ABICI can help you achieve your goals.': 'Redo att transformera ditt företag? Låt oss diskutera hur ABICI kan hjälpa dig att uppnå dina mål.',
        'Send Message': 'Skicka Meddelande',
        'Your Name': 'Ditt Namn',
        'Your Email': 'Din E-post',
        'Company Name': 'Företagsnamn',
        'Your Message': 'Ditt Meddelande',
        
        // Footer
        'Leading management consultancy delivering strategic excellence and audit leadership.': 'Ledande managementkonsultföretag som levererar strategisk excellens och revisionsledarskap.',
        'Follow Us': 'Följ Oss',
        'All rights reserved.': 'Alla rättigheter förbehållna.'
    }
};

// Language system setup
function setupLanguageSystem() {
    // Set initial language (try localStorage, fallback to 'en')
    try {
        const savedLanguage = localStorage.getItem('abici-language');
        currentLanguage = savedLanguage || 'en';
    } catch (e) {
        console.log('localStorage not available, using default language');
        currentLanguage = 'en';
    }
    
    updateLanguageIndicator();
    translatePage();
}

// Toggle language function
function toggleLanguage() {
    console.log('Language toggle clicked, current language:', currentLanguage);
    
    // Toggle between languages
    currentLanguage = currentLanguage === 'en' ? 'sv' : 'en';
    
    console.log('New language:', currentLanguage);
    
    // Try to save to localStorage
    try {
        localStorage.setItem('abici-language', currentLanguage);
    } catch (e) {
        console.log('Cannot save to localStorage:', e);
    }
    
    // Update the page
    updateLanguageIndicator();
    translatePage();
}

// Update language indicator
function updateLanguageIndicator() {
    const indicator = document.getElementById('lang-indicator');
    if (indicator) {
        indicator.textContent = currentLanguage.toUpperCase();
        console.log('Language indicator updated to:', currentLanguage.toUpperCase());
    } else {
        console.log('Language indicator element not found');
    }
}

// Translate the entire page
function translatePage() {
    console.log('Translating page to:', currentLanguage);
    
    // Get all elements with translation attributes
    const elements = document.querySelectorAll('[data-en], [data-sv]');
    console.log('Found elements to translate:', elements.length);
    
    elements.forEach(element => {
        const key = element.getAttribute(`data-${currentLanguage}`);
        if (key) {
            // Check if translation exists
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            } else {
                // Fallback: use the key itself as the text
                element.textContent = key;
            }
        }
    });
    
    // Update form placeholders
    updateFormPlaceholders();
    
    console.log('Page translation completed');
}

// Update form placeholders
function updateFormPlaceholders() {
    const placeholderElements = document.querySelectorAll('[data-en-placeholder], [data-sv-placeholder]');
    
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
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

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    
    // Validate form
    if (validateForm(formValues)) {
        // Show success message
        showMessage('success', currentLanguage === 'en' ? 'Message sent successfully!' : 'Meddelandet skickades framgångsrikt!');
        
        // Reset form
        e.target.reset();
        
        // In a real application, you would send the data to your server
        console.log('Form submitted:', formValues);
    } else {
        showMessage('error', currentLanguage === 'en' ? 'Please fill in all required fields.' : 'Vänligen fyll i alla obligatoriska fält.');
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
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
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

// Export functions for global access
window.toggleLanguage = toggleLanguage;

// Debug function to test language switching
window.debugLanguage = function() {
    console.log('Current language:', currentLanguage);
    console.log('Available translations:', Object.keys(translations));
    console.log('Elements with data attributes:', document.querySelectorAll('[data-en], [data-sv]').length);
};