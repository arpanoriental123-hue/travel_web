// Booking Modal Functionality

// DOM elements
let modal = null;
let overlay = null;
let currentDestination = "";
let currentPrice = "";

// Function to create the modal HTML structure
function createModal() {
    // Create the modal overlay
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Create the modal container
    modal = document.createElement('div');
    modal.className = 'booking-modal';
    
    // Modal content
    modal.innerHTML = `
        <div class="modal-header">
            <h2>Book Your Trip</h2>
            <span class="close-modal">&times;</span>
        </div>
        <div class="modal-body">
            <div class="booking-form" id="booking-form">
                <h3 id="destination-title">Destination: <span id="selected-destination"></span></h3>
                <p class="price-tag">Package Price: <span id="selected-price"></span></p>
                
                <div class="form-group">
                    <label for="full-name">Full Name</label>
                    <input type="text" id="full-name" placeholder="Enter your full name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter your email" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group half">
                        <label for="departure-date">Departure Date</label>
                        <input type="date" id="departure-date" required>
                    </div>
                    <div class="form-group half">
                        <label for="return-date">Return Date</label>
                        <input type="date" id="return-date" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="travelers">Number of Travelers</label>
                    <select id="travelers" required>
                        <option value="" disabled selected>Select number of travelers</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6+">6+</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <button type="button" id="submit-booking" class="btn book-btn">Confirm Booking</button>
                </div>
            </div>
            
            <div class="booking-confirmation" id="booking-confirmation" style="display:none;">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Booking Confirmed!</h3>
                <p>Thank you for booking with Travellrr.</p>
                <p>Your trip to <span id="confirm-destination"></span> has been confirmed.</p>
                <p>A confirmation email has been sent to <span id="confirm-email"></span>.</p>
                <p class="booking-details">
                    <strong>Departure:</strong> <span id="confirm-departure"></span><br>
                    <strong>Return:</strong> <span id="confirm-return"></span><br>
                    <strong>Travelers:</strong> <span id="confirm-travelers"></span>
                </p>
                <button type="button" id="close-confirmation" class="btn">Close</button>
            </div>
        </div>
    `;
    
    // Append modal to overlay
    overlay.appendChild(modal);
    
    // Append overlay to body
    document.body.appendChild(overlay);
    
    // Event listeners for modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Submit booking
    const submitBtn = modal.querySelector('#submit-booking');
    submitBtn.addEventListener('click', handleBookingSubmit);
    
    // Close confirmation
    const closeConfirmBtn = modal.querySelector('#close-confirmation');
    closeConfirmBtn.addEventListener('click', closeModal);
}

// Open modal function
function openModal(destination, price) {
    currentDestination = destination;
    currentPrice = price;
    
    // Create modal if it doesn't exist
    if (!modal) {
        createModal();
    }
    
    // Set destination and price
    document.getElementById('selected-destination').textContent = destination;
    document.getElementById('selected-price').textContent = price;
    
    // Show the modal and overlay
    modal.style.display = 'block';
    overlay.style.display = 'flex';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Reset form
    document.getElementById('booking-form').style.display = 'block';
    document.getElementById('booking-confirmation').style.display = 'none';
    
    // Set minimum dates for departure and return
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const departureInput = document.getElementById('departure-date');
    const returnInput = document.getElementById('return-date');
    
    // Format date as YYYY-MM-DD
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    departureInput.min = formatDate(tomorrow);
    returnInput.min = formatDate(tomorrow);
    
    // Add event listener to departure date to ensure return date is after
    departureInput.addEventListener('change', function() {
        const departureDate = new Date(this.value);
        const nextDay = new Date(departureDate);
        nextDay.setDate(nextDay.getDate() + 1);
        returnInput.min = formatDate(nextDay);
        
        // If return date is before departure date, reset it
        if (new Date(returnInput.value) <= departureDate) {
            returnInput.value = '';
        }
    });
}

// Close modal function
function closeModal() {
    if (overlay) {
        overlay.style.display = 'none';
        // Allow body scrolling again
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('booking-form');
        if (form) {
            form.reset();
        }
    }
}

// Handle booking submission
function handleBookingSubmit() {
    // Get form values
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const departureDate = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
    const travelers = document.getElementById('travelers').value;
    
    // Simple validation
    if (!fullName || !email || !departureDate || !returnDate || !travelers) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Format dates for display
    const formatDisplayDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    // Show confirmation screen
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('booking-confirmation').style.display = 'block';
    
    // Set confirmation details
    document.getElementById('confirm-destination').textContent = currentDestination;
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-departure').textContent = formatDisplayDate(departureDate);
    document.getElementById('confirm-return').textContent = formatDisplayDate(returnDate);
    document.getElementById('confirm-travelers').textContent = travelers;
}

// Initialize booking buttons
document.addEventListener('DOMContentLoaded', function() {
    // Find all book now buttons
    const bookButtons = document.querySelectorAll('.btn');
    
    bookButtons.forEach(button => {
        // Check if button text is "book now"
        if (button.textContent.toLowerCase().trim() === 'book now') {
            // Replace default link behavior
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get destination and price from parent elements
                const card = button.closest('.box');
                const destination = card.querySelector('h3').textContent.trim().replace(/^\s*\S+\s+/, ''); // Remove icon
                const priceElement = card.querySelector('.price');
                const price = priceElement.textContent.split('₹')[1].split(' ')[0].trim();
                
                // Open booking modal
                openModal(destination, '₹' + price);
            });
        }
    });
});