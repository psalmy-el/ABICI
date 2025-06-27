// Updated language.js - Global Language Manager with persistent storage
class LanguageManager {
    constructor() {
        this.storageKey = 'abici-language-global';
        this.currentLanguage = this.getStoredLanguage() || 'sv'; // Default to Swedish
        this.init();
    }

    // Get language from storage with better fallback handling
    getStoredLanguage() {
        // Try multiple storage methods
        try {
            // First try localStorage
            const stored = localStorage.getItem(this.storageKey);
            if (stored) return stored;
        } catch (e) {
            console.log('localStorage not available');
        }
        
        try {
            // Fallback to sessionStorage
            const stored = sessionStorage.getItem(this.storageKey);
            if (stored) return stored;
        } catch (e) {
            console.log('sessionStorage not available');
        }
        
        try {
            // Fallback to cookie
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === this.storageKey) {
                    return value;
                }
            }
        } catch (e) {
            console.log('Cookies not available');
        }
        
        // Final fallback - check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam === 'en' || langParam === 'sv') {
            return langParam;
        }
        
        return null;
    }

    // Save language to all available storage methods
    saveLanguage(language) {
        try {
            localStorage.setItem(this.storageKey, language);
        } catch (e) {
            console.log('localStorage save failed');
        }
        
        try {
            sessionStorage.setItem(this.storageKey, language);
        } catch (e) {
            console.log('sessionStorage save failed');
        }
        
        try {
            // Set cookie with 1 year expiry
            const expires = new Date();
            expires.setFullYear(expires.getFullYear() + 1);
            document.cookie = `${this.storageKey}=${language}; expires=${expires.toUTCString()}; path=/`;
        } catch (e) {
            console.log('Cookie save failed');
        }
        
        // Also store in a global variable as ultimate fallback
        window.abiciLanguage = language;
    }

    // Initialize language system
    init() {
        // Set document language attribute
        document.documentElement.lang = this.currentLanguage;
        
        // Update language indicator immediately
        this.updateLanguageIndicator();
        
        // Listen for storage changes (when language changes in another tab)
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.currentLanguage = e.newValue || 'sv';
                this.updateLanguageIndicator();
                this.translatePage();
                console.log('Language updated from storage event:', this.currentLanguage);
            }
        });
        
        // Listen for custom language change events
        window.addEventListener('languageChanged', (e) => {
            this.currentLanguage = e.detail.language;
            this.updateLanguageIndicator();
            this.translatePage();
            console.log('Language updated from custom event:', this.currentLanguage);
        });
        
        console.log('Language Manager initialized with language:', this.currentLanguage);
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Toggle language
    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'sv' ? 'en' : 'sv';
        this.setLanguage(newLanguage);
    }

    // Set specific language
    setLanguage(language) {
        if (language !== 'sv' && language !== 'en') {
            console.warn('Invalid language:', language);
            return;
        }
        
        const oldLanguage = this.currentLanguage;
        this.currentLanguage = language;
        
        // Save to all storage methods
        this.saveLanguage(language);
        
        // Update UI
        this.updateLanguageIndicator();
        this.translatePage();
        
        // Update document language
        document.documentElement.lang = language;
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language, oldLanguage }
        }));
        
        console.log('Language changed from', oldLanguage, 'to', language);
    }

    // Update language indicator
    updateLanguageIndicator() {
        const indicators = document.querySelectorAll('#lang-indicator, .lang-indicator');
        indicators.forEach(indicator => {
            indicator.textContent = this.currentLanguage.toUpperCase();
        });
    }

    // Translate page using the global translation function
    translatePage() {
        if (typeof window.translatePageContent === 'function') {
            window.translatePageContent();
        } else {
            console.log('translatePageContent function not available');
        }
    }

    // Setup language toggle button
    setupLanguageToggle() {
        const langToggles = document.querySelectorAll('.lang-toggle');
        
        langToggles.forEach(toggle => {
            // Remove existing event listeners by cloning
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            // Add new event listener
            newToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleLanguage();
            });
        });
        
        console.log('Language toggle event listeners attached to', langToggles.length, 'elements');
    }
}

// Create global instance
window.languageManager = new LanguageManager();

// Enhanced translation dictionaries - shared across all pages
window.translations = {
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
        'Alla rättigheter förbehållna.': 'All rights reserved.',

        // Terms & Privacy
        'Villkor': 'Terms',
        'Integritetspolicy': 'Privacy Policy',
        'Användarvillkor': 'Terms of Service',
        
        // Terms page specific
        'Användarvillkor och Integritetspolicy': 'Terms of Service and Privacy Policy',
        'Välj en flik för att visa innehåll': 'Select a tab to view content',
        'Senast uppdaterad': 'Last updated',
        'Kontakta oss om du har frågor': 'Contact us if you have any questions',
        
        // Buttons
        'Tillbaka till Hem': 'Back to Home'
    },
    
    sv: {
        // Reverse mapping for Swedish (since HTML is in Swedish by default)
        'Home': 'Hem',
        'Services': 'Tjänster',
        'About': 'Om oss',
        'Expertise': 'Expertis',
        'Contact': 'Kontakt',
        'Terms': 'Villkor',
        'Privacy Policy': 'Integritetspolicy',
        'Terms of Service': 'Användarvillkor',
        'Back to Home': 'Tillbaka till Hem',
        'Terms of Service and Privacy Policy': 'Användarvillkor och Integritetspolicy',
        'Select a tab to view content': 'Välj en flik för att visa innehåll',
        'Last updated': 'Senast uppdaterad',
        'Contact us if you have any questions': 'Kontakta oss om du har frågor'
    }
};

// Enhanced utility function for all pages to translate
window.translatePageContent = function() {
    const currentLang = window.languageManager.getCurrentLanguage();
    console.log('Translating page to:', currentLang);
    
    // Get all elements with translation attributes
    const elements = document.querySelectorAll('[data-en], [data-sv]');
    console.log('Found elements to translate:', elements.length);
    
    elements.forEach(element => {
        const key = element.getAttribute(`data-${currentLang}`);
        if (key) {
            // Use translations object or fallback to the key
            const translation = window.translations[currentLang] && window.translations[currentLang][key];
            element.textContent = translation || key;
        }
    });
    
    // Update form placeholders
    const placeholderElements = document.querySelectorAll('[data-en-placeholder], [data-sv-placeholder]');
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${currentLang}-placeholder`);
        if (placeholder) {
            const translation = window.translations[currentLang] && window.translations[currentLang][placeholder];
            element.placeholder = translation || placeholder;
        }
    });
    
    // Update any elements that just use text content matching
    document.querySelectorAll('*').forEach(element => {
        // Skip if element has children (to avoid replacing parent text)
        if (element.children.length === 0 && element.textContent) {
            const text = element.textContent.trim();
            if (window.translations[currentLang] && window.translations[currentLang][text]) {
                element.textContent = window.translations[currentLang][text];
            }
        }
    });
    
    console.log('Page translation completed for language:', currentLang);
};

// Override the translatePage method
window.languageManager.translatePage = window.translatePageContent;

// Utility function to initialize language on any page
window.initializeLanguageSystem = function() {
    if (window.languageManager) {
        // Setup the language toggle button
        window.languageManager.setupLanguageToggle();
        
        // Translate the page based on current language
        window.languageManager.translatePage();
        
        console.log('Language system initialized');
        console.log('Current language:', window.languageManager.getCurrentLanguage());
        
        return true;
    } else {
        console.error('Global language manager not found!');
        return false;
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all scripts are loaded
    setTimeout(() => {
        window.initializeLanguageSystem();
    }, 100);
});

console.log('Global Language Manager loaded successfully');