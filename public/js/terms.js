// Debug: Check if script is loading
console.log("Terms.js loaded successfully!");

// Language functionality
let currentLanguage = 'sv'; // Default to Swedish

function toggleLanguage() {
    console.log("Toggle language clicked, current:", currentLanguage);
    currentLanguage = currentLanguage === 'sv' ? 'en' : 'sv';
    updateLanguage();
}

function updateLanguage() {
    console.log("Updating language to:", currentLanguage);
    
    // Get all elements with language data attributes
    const elements = document.querySelectorAll('[data-sv]');
    console.log("Found elements with language data:", elements.length);
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
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
    }
    
    // Update document language
    document.documentElement.lang = currentLanguage;
}

// Tab switching functionality
function showTab(tabName) {
    console.log("Switching to tab:", tabName);
    
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Home button functionality
function goHome() {
    console.log("Going home...");
    // You can change this URL to your actual home page
    window.location.href = '/';
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing...");
    
    // Set initial language
    updateLanguage();
    
    // Make sure the first tab is active by default
    const firstTab = document.querySelector('.tab-content');
    const firstButton = document.querySelector('.tab-button');
    
    if (firstTab && !firstTab.classList.contains('active')) {
        firstTab.classList.add('active');
    }
    
    if (firstButton && !firstButton.classList.contains('active')) {
        firstButton.classList.add('active');
    }
    
    // Add event listeners for buttons (CSP-compliant)
    const homeButton = document.querySelector('.home-button');
    if (homeButton) {
        homeButton.addEventListener('click', goHome);
        console.log("Home button event listener added");
    }
    
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
        console.log("Language toggle event listener added");
    }
    
    // Add event listeners for tab buttons
    const termsButton = document.querySelector('[data-tab="terms"]');
    const privacyButton = document.querySelector('[data-tab="privacy"]');
    
    if (termsButton) {
        termsButton.addEventListener('click', function() {
            showTab('terms');
        });
        console.log("Terms tab event listener added");
    }
    
    if (privacyButton) {
        privacyButton.addEventListener('click', function() {
            showTab('privacy');
        });
        console.log("Privacy tab event listener added");
    }
    
    // Fallback: Add event listeners to all tab buttons
    const allTabButtons = document.querySelectorAll('.tab-button');
    allTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab') || 
                           (this.textContent.toLowerCase().includes('villkor') || 
                            this.textContent.toLowerCase().includes('terms') ? 'terms' : 'privacy');
            showTab(tabName);
        });
    });
    
    console.log("Initialization complete!");
});

// Additional event listeners for better compatibility
window.addEventListener('load', function() {
    console.log("Window loaded - Double checking initialization...");
    updateLanguage();
    
    // Double-check event listeners are attached
    const homeButton = document.querySelector('.home-button');
    const langToggle = document.querySelector('.lang-toggle');
    
    if (homeButton && !homeButton.onclick) {
        homeButton.addEventListener('click', goHome);
        console.log("Home button event listener re-added");
    }
    
    if (langToggle && !langToggle.onclick) {
        langToggle.addEventListener('click', toggleLanguage);
        console.log("Language toggle event listener re-added");
    }
});