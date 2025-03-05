/**
 * CJ's Duct Cleaning - Price Calculator
 * 
 * This script handles the price calculator functionality based on the
 * number of floors and vents selected by the user.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the necessary DOM elements
    const floorsSelect = document.getElementById('floors');
    const ventsSelect = document.getElementById('vents');
    const priceDisplay = document.getElementById('price-display');
    const quoteForm = document.getElementById('quote-form');

    // Price matrix based on the provided table
    // [rows: vent ranges, columns: floor numbers]
    const priceMatrix = {
        '1-3': [300, 400, 450, 550, 650],
        '4-6': [400, 450, 650, 750, 850],
        '7-10': [650, 750, 850, 950, 1150],
        '11-15': [750, 850, 950, 1150, 1250],
        '16-20': [950, 1150, 1250, 1450, 1650]
    };

    // Function to update the price display
    function updatePrice() {
        const floors = parseInt(floorsSelect.value);
        const vents = ventsSelect.value;
        
        // Get the price from the matrix (floors - 1 because array is 0-indexed)
        const price = priceMatrix[vents][floors - 1];
        
        // Format the price with commas and dollar sign
        const formattedPrice = '$' + price.toLocaleString();
        
        // Update the price display
        priceDisplay.textContent = formattedPrice;
        
        // Add animation effect
        priceDisplay.classList.add('price-updated');
        setTimeout(() => {
            priceDisplay.classList.remove('price-updated');
        }, 500);
    }

    // Add event listeners to the select elements
    floorsSelect.addEventListener('change', updatePrice);
    ventsSelect.addEventListener('change', updatePrice);

    // Initialize the price display
    updatePrice();

    // Handle the quote form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, just show a success message
            const formElements = quoteForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit') {
                    formElements[i].value = '';
                }
            }
            
            // Create and show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your request! We will contact you soon.';
            
            quoteForm.parentNode.appendChild(successMessage);
            
            // Remove the message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .benefit-card, .calculator-container, .price-table-container, .contact-grid');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-in');
            }
        });
    };

    // Run the animation function on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Add CSS for the animations
    const style = document.createElement('style');
    style.textContent = `
        .price-updated {
            animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .service-card, .benefit-card, .calculator-container, .price-table-container, .contact-grid {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            background-color: #8DC63F;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});
