// Global variables
let currentLanguage = 'sv'; // Swedish as default
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

// Language Translation System
const translations = {
    en: {
        // Navigation
        'Hem': 'Home',
        'Tjänster': 'Services',
        'Om oss': 'About',
        'Expertis': 'Expertise',
        'Kontakt': 'Contact',
        
        // Hero Section
        'Omvandlar Affärsexcellens Genom Strategiskt Ledarskap': 'Transforming Business Excellence Through Strategic Leadership',
        'Som huvudrevisorer och managementkonsulter levererar vi datadrivna insikter och strategiska lösningar som driver hållbar tillväxt och operativ excellens.': 'As lead auditors and management consultants, we deliver data-driven insights and strategic solutions that drive sustainable growth and operational excellence.',
        'Kom igång': 'Get Started',
        'Läs mer': 'Learn More',
        
        // Services
        'Våra Tjänster': 'Our Services',
        'Omfattande konsultlösningar skräddarsydda för dina affärsbehov': 'Comprehensive consulting solutions tailored to your business needs',
        'Strategisk Planering': 'Strategic Planning',
        'Utveckla omfattande strategier som stämmer överens med din vision och driver mätbara resultat genom datadrivet beslutsfattande.': 'Develop comprehensive strategies that align with your vision and drive measurable results through data-driven decision making.',
        'Huvudrevision': 'Lead Auditing',
        'Expertrevisionstjänster som säkerställer efterlevnad, riskhantering och operativ effektivitet i alla affärsprocesser.': 'Expert audit services ensuring compliance, risk management, and operational efficiency across all business processes.',
        'Processoptimering': 'Process Optimization',
        'Effektivisera verksamheten och eliminera ineffektivitet för att maximera produktiviteten och minska kostnaderna samtidigt som kvaliteten bibehålls.': 'Streamline operations and eliminate inefficiencies to maximize productivity and reduce costs while maintaining quality.',
        'Förändringsledning': 'Change Management',
        'Vägled din organisation genom transformation med strukturerade tillvägagångssätt som säkerställer framgångsrik adoption och minimal störning.': 'Guide your organization through transformation with structured approaches that ensure successful adoption and minimal disruption.',
        'Riskhantering': 'Risk Management',
        'Identifiera, bedöma och mildra affärsrisker samtidigt som robusta ramverk utvecklas för pågående riskövervakning och kontroll.': 'Identify, assess, and mitigate business risks while developing robust frameworks for ongoing risk monitoring and control.',
        'Prestandaförbättring': 'Performance Enhancement',
        'Öka organisationens prestanda genom riktade interventioner, KPI-optimering och kontinuerliga förbättringsmetoder.': 'Boost organizational performance through targeted interventions, KPI optimization, and continuous improvement methodologies.',
        
        // About
        'Om ABICI': 'About ABICI',
        'Med decennier av kombinerad erfarenhet inom managementkonsultation och huvudrevision står ABICI som en pålitlig partner för organisationer som söker transformativ förändring och hållbar tillväxt.': 'With decades of combined experience in management consulting and lead auditing, ABICI stands as a trusted partner for organizations seeking transformational change and sustainable growth.',
        'Vår expertis sträcker sig över branscher, från Fortune 500-företag till framväxande startups, och levererar skräddarsydda lösningar som driver mätbara resultat och varaktig påverkan.': 'Our expertise spans across industries, from Fortune 500 companies to emerging startups, delivering tailored solutions that drive measurable results and lasting impact.',
        'Genomförda Projekt': 'Projects Completed',
        'Års Erfarenhet': 'Years Experience',
        'Kundnöjdhet': 'Client Satisfaction',
        
        // Expertise
        'Vår Expertis': 'Our Expertise',
        'Branschledande kunskap inom flera sektorer': 'Industry-leading knowledge across multiple sectors',
        'Finansiella Tjänster': 'Financial Services',
        'Regelefterlevnad, riskbedömning och prestandaoptimering för finansiella institutioner.': 'Regulatory compliance, risk assessment, and performance optimization for financial institutions.',
        'Hälsovård': 'Healthcare',
        'Kvalitetsledning, operativ effektivitet och efterlevnadsrevision för vårdorganisationer.': 'Quality management, operational efficiency, and compliance auditing for healthcare organizations.',
        'Teknologi': 'Technology',
        'Digital transformation, processautomation och strategisk teknikimplementering.': 'Digital transformation, process automation, and strategic technology implementation.',
        'Tillverkning': 'Manufacturing',
        'Lean-verksamhet, optimering av leveranskedjan och kvalitetssäkringssystem.': 'Lean operations, supply chain optimization, and quality assurance systems.',
        
        // Contact
        'Kontakta Oss': 'Get In Touch',
        'Redo att transformera ditt företag? Låt oss diskutera hur ABICI kan hjälpa dig att uppnå dina mål.': 'Ready to transform your business? Let\'s discuss how ABICI can help you achieve your goals.',
        'Skicka Meddelande': 'Send Message',
        'Ditt Namn': 'Your Name',
        'Din E-post': 'Your Email',
        'Företagsnamn': 'Company Name',
        'telefonnummer': 'phone number',
        'Ditt Meddelande': 'Your Message',
        
        // Footer
        'Ledande managementkonsultföretag som levererar strategisk excellens och revisionsledarskap.': 'Leading management consultancy delivering strategic excellence and audit leadership.',
        'Följ Oss': 'Follow Us',
        'Alla rättigheter förbehållna.': 'All rights reserved.'
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
        'phone number': 'telefonnummer',
        'Your Message': 'Ditt Meddelande',
        
        // Footer
        'Leading management consultancy delivering strategic excellence and audit leadership.': 'Ledande managementkonsultföretag som levererar strategisk excellens och revisionsledarskap.',
        'Follow Us': 'Följ Oss',
        'All rights reserved.': 'Alla rättigheter förbehållna.'
    }
};

// Language system setup
function setupLanguageSystem() {
    // Check for saved language preference, default to Swedish
    try {
        const savedLanguage = sessionStorage.getItem('abici-language');
        currentLanguage = savedLanguage || 'sv'; // Default to Swedish
    } catch (e) {
        console.log('sessionStorage not available, using default language (Swedish)');
        currentLanguage = 'sv';
    }
    
    // Setup language toggle button event listener
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
        console.log('Language toggle event listener attached');
    } else {
        console.log('Language toggle button not found');
    }
    
    // Update language indicator and translate page
    updateLanguageIndicator();
    
    // Only translate if the current language is different from the HTML default (Swedish)
    // Since HTML is already in Swedish, only translate if we need English
    if (currentLanguage === 'en') {
        translatePage();
    }
}

// Toggle language function
function toggleLanguage(event) {
    // Prevent any default behavior
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    console.log('Language toggle clicked, current language:', currentLanguage);
    
    // Toggle between languages
    currentLanguage = currentLanguage === 'sv' ? 'en' : 'sv';
    
    console.log('New language:', currentLanguage);
    
    // Try to save to sessionStorage
    try {
        sessionStorage.setItem('abici-language', currentLanguage);
    } catch (e) {
        console.log('Cannot save to sessionStorage:', e);
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
            // For Swedish, check if we have a translation in the translations object
            // If not, use the key directly (since HTML already contains Swedish text)
            if (currentLanguage === 'sv') {
                // If we have a translation from English to Swedish, use it
                // Otherwise, use the key as it's already in Swedish
                if (translations.sv && translations.sv[key]) {
                    element.textContent = translations.sv[key];
                } else {
                    element.textContent = key;
                }
            } else {
                // For English, use translation or fallback to key
                if (translations.en && translations.en[key]) {
                    element.textContent = translations.en[key];
                } else {
                    element.textContent = key;
                }
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

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    
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
            body: JSON.stringify({ email })
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
    console.log('Current language:', currentLanguage);
    console.log('Available translations:', Object.keys(translations));
    console.log('Elements with data attributes:', document.querySelectorAll('[data-en], [data-sv]').length);
    
    // Test language toggle
    console.log('Testing language toggle...');
    toggleLanguage();
};