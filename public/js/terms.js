// Debug: Check if script is loading
console.log("Terms.js loaded successfully!");

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
    
    // Add active class to the correct button based on tab name
    const tabButtons2 = document.querySelectorAll('.tab-button');
    tabButtons2.forEach(button => {
        // Check if this button corresponds to the selected tab
        if (tabName === 'terms') {
            // First button is terms (contains "Villkor" or "Terms")
            const buttonText = button.textContent.toLowerCase();
            if (buttonText.includes('villkor') || buttonText.includes('terms')) {
                button.classList.add('active');
            }
        } else if (tabName === 'privacy') {
            // Second button is privacy (contains "Integritetspolicy" or "Privacy")
            const buttonText = button.textContent.toLowerCase();
            if (buttonText.includes('integritetspolicy') || buttonText.includes('privacy')) {
                button.classList.add('active');
            }
        }
    });
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
    
    // Make sure the first tab (terms) is active by default
    showTab('terms');
    
    // Add event listeners for buttons (CSP-compliant)
    const homeButton = document.querySelector('.home-button');
    if (homeButton) {
        homeButton.addEventListener('click', goHome);
        console.log("Home button event listener added");
    }
    
    // Language toggle will be handled by the global language manager
    // Don't add event listeners here to avoid conflicts
    
    // Add event listeners for tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('villkor') || buttonText.includes('terms')) {
                showTab('terms');
            } else if (buttonText.includes('integritetspolicy') || buttonText.includes('privacy')) {
                showTab('privacy');
            }
        });
    });
    
    // Listen for language changes from the global language manager
    window.addEventListener('languageChanged', function(e) {
        console.log('Language changed to:', e.detail.language);
        // Re-check which tab should be active after language change
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const tabId = activeTab.id;
            // Small delay to allow translation to complete
            setTimeout(() => {
                showTab(tabId);
            }, 100);
        }
    });
    
    console.log("Initialization complete!");
});

// Additional event listeners for better compatibility
window.addEventListener('load', function() {
    console.log("Window loaded - Double checking initialization...");
    
    // Double-check home button event listener
    const homeButton = document.querySelector('.home-button');
    if (homeButton && !homeButton.onclick) {
        homeButton.addEventListener('click', goHome);
        console.log("Home button event listener re-added");
    }
    
    // Language toggle is handled by global language manager
    // Don't interfere with it here
});