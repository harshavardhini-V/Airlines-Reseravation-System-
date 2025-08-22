// Airline Reservation System JavaScript

class AirlineReservationSystem {
    constructor() {
        this.flights = [];
        this.bookings = [];
        this.currentBooking = null;
        this.selectedSeats = [];
        this.currentStep = 1;
        
        this.init();
        this.loadBookings();
        this.generateSampleFlights();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setMinDate();
    }

    setupEventListeners() {
        // Flight search form
        document.getElementById('flightSearchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.searchFlights();
        });

        // Trip type radio buttons
        document.querySelectorAll('input[name="tripType"]').forEach(radio => {
            radio.addEventListener('change', this.handleTripTypeChange.bind(this));
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Confirm seats button
        document.getElementById('confirmSeats').addEventListener('click', () => {
            this.confirmSeatSelection();
        });

        // Window click to close modal
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('seatModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.showSection(target);
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('departDate').min = today;
        document.getElementById('returnDate').min = today;
        
        // Set default departure date to today
        document.getElementById('departDate').value = today;
        
        // Update return date when departure date changes
        document.getElementById('departDate').addEventListener('change', (e) => {
            const departDate = e.target.value;
            const returnDateInput = document.getElementById('returnDate');
            returnDateInput.min = departDate;
            
            if (returnDateInput.value && returnDateInput.value < departDate) {
                returnDateInput.value = departDate;
            }
        });
    }

    handleTripTypeChange(e) {
        const returnDateGroup = document.getElementById('returnDateGroup');
        const returnDateInput = document.getElementById('returnDate');
        
        if (e.target.value === 'oneway') {
            returnDateGroup.style.display = 'none';
            returnDateInput.required = false;
        } else {
            returnDateGroup.style.display = 'block';
            returnDateInput.required = true;
        }
    }

    generateSampleFlights() {
        const cities = [
            { code: 'NYC', name: 'New York' },
            { code: 'LAX', name: 'Los Angeles' },
            { code: 'CHI', name: 'Chicago' },
            { code: 'MIA', name: 'Miami' },
            { code: 'LAS', name: 'Las Vegas' },
            { code: 'SEA', name: 'Seattle' },
            { code: 'BOS', name: 'Boston' },
            { code: 'DEN', name: 'Denver' }
        ];

        const airlines = ['SkyLine', 'AirMax', 'CloudJet', 'StarFly'];
        const times = ['06:00', '08:30', '11:15', '14:45', '17:20', '19:55'];
        
        this.flights = [];
        
        cities.forEach(from => {
            cities.forEach(to => {
                if (from.code !== to.code) {
                    times.forEach((time, index) => {
                        const duration = this.calculateFlightDuration(from.code, to.code);
                        const arrivalTime = this.addHoursToTime(time, duration);
                        const basePrice = this.calculateBasePrice(from.code, to.code);
                        
                        this.flights.push({
                            id: `${from.code}${to.code}${index}`,
                            airline: airlines[Math.floor(Math.random() * airlines.length)],
                            from: from,
                            to: to,
                            departTime: time,
                            arrivalTime: arrivalTime,
                            duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
                            price: {
                                economy: basePrice,
                                business: Math.round(basePrice * 2.5),
                                first: Math.round(basePrice * 4)
                            },
                            availableSeats: Math.floor(Math.random() * 50) + 100
                        });
                    });
                }
            });
        });
    }

    calculateFlightDuration(from, to) {
        const distances = {
            'NYC-LAX': 5, 'NYC-CHI': 2, 'NYC-MIA': 3, 'NYC-LAS': 5, 'NYC-SEA': 6, 'NYC-BOS': 1, 'NYC-DEN': 4,
            'LAX-CHI': 4, 'LAX-MIA': 5, 'LAX-LAS': 1, 'LAX-SEA': 3, 'LAX-BOS': 6, 'LAX-DEN': 2,
            'CHI-MIA': 3, 'CHI-LAS': 4, 'CHI-SEA': 4, 'CHI-BOS': 3, 'CHI-DEN': 2,
            'MIA-LAS': 5, 'MIA-SEA': 6, 'MIA-BOS': 3, 'MIA-DEN': 4,
            'LAS-SEA': 2, 'LAS-BOS': 5, 'LAS-DEN': 2,
            'SEA-BOS': 5, 'SEA-DEN': 2,
            'BOS-DEN': 4
        };
        
        const key = `${from}-${to}`;
        const reverseKey = `${to}-${from}`;
        
        return distances[key] || distances[reverseKey] || 3;
    }

    calculateBasePrice(from, to) {
        const basePrices = {
            'NYC-LAX': 350, 'NYC-CHI': 180, 'NYC-MIA': 220, 'NYC-LAS': 280, 'NYC-SEA': 320, 'NYC-BOS': 120, 'NYC-DEN': 250,
            'LAX-CHI': 300, 'LAX-MIA': 380, 'LAX-LAS': 80, 'LAX-SEA': 200, 'LAX-BOS': 400, 'LAX-DEN': 150,
            'CHI-MIA': 250, 'CHI-LAS': 220, 'CHI-SEA': 280, 'CHI-BOS': 200, 'CHI-DEN': 120,
            'MIA-LAS': 300, 'MIA-SEA': 350, 'MIA-BOS': 280, 'MIA-DEN': 250,
            'LAS-SEA': 150, 'LAS-BOS': 320, 'LAS-DEN': 100,
            'SEA-BOS': 350, 'SEA-DEN': 120,
            'BOS-DEN': 280
        };
        
        const key = `${from}-${to}`;
        const reverseKey = `${to}-${from}`;
        
        return basePrices[key] || basePrices[reverseKey] || 200;
    }

    addHoursToTime(time, hours) {
        const [h, m] = time.split(':').map(Number);
        const totalMinutes = h * 60 + m + hours * 60;
        const newHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;
        
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    }

    async searchFlights() {
        const formData = new FormData(document.getElementById('flightSearchForm'));
        const searchParams = {
            from: formData.get('from') || document.getElementById('from').value,
            to: formData.get('to') || document.getElementById('to').value,
            departDate: formData.get('departDate') || document.getElementById('departDate').value,
            returnDate: formData.get('returnDate') || document.getElementById('returnDate').value,
            passengers: formData.get('passengers') || document.getElementById('passengers').value,
            class: formData.get('class') || document.getElementById('class').value,
            tripType: document.querySelector('input[name="tripType"]:checked').value
        };

        // Validation
        if (!searchParams.from || !searchParams.to) {
            alert('Please select both departure and destination cities.');
            return;
        }

        if (searchParams.from === searchParams.to) {
            alert('Departure and destination cities cannot be the same.');
            return;
        }

        if (!searchParams.departDate) {
            alert('Please select a departure date.');
            return;
        }

        if (searchParams.tripType === 'roundtrip' && !searchParams.returnDate) {
            alert('Please select a return date for round trip.');
            return;
        }

        // Show loading spinner
        this.showLoadingSpinner();

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Filter flights
        const availableFlights = this.flights.filter(flight => 
            flight.from.code === searchParams.from && 
            flight.to.code === searchParams.to
        );

        // Hide loading spinner
        this.hideLoadingSpinner();

        // Display results
        this.displayFlightResults(availableFlights, searchParams);
    }

    displayFlightResults(flights, searchParams) {
        const resultsContainer = document.getElementById('flightResults');
        const flightsList = document.getElementById('flightsList');
        
        if (flights.length === 0) {
            flightsList.innerHTML = `
                <div class="no-flights">
                    <i class="fas fa-plane-slash"></i>
                    <p>No flights found for your search criteria.</p>
                    <p>Please try different dates or destinations.</p>
                </div>
            `;
        } else {
            flightsList.innerHTML = flights.map(flight => `
                <div class="flight-card" data-flight-id="${flight.id}">
                    <div class="flight-info">
                        <div class="flight-time">
                            <div class="time">${flight.departTime}</div>
                            <div class="city">${flight.from.name}</div>
                        </div>
                        <div class="flight-duration">
                            <i class="fas fa-plane"></i>
                            <div class="duration">${flight.duration}</div>
                            <div class="airline">${flight.airline}</div>
                        </div>
                        <div class="flight-time">
                            <div class="time">${flight.arrivalTime}</div>
                            <div class="city">${flight.to.name}</div>
                        </div>
                        <div class="flight-price">
                            <div class="price">$${flight.price[searchParams.class]}</div>
                            <div class="per-person">per person</div>
                            <button class="select-flight-btn" onclick="airlineSystem.selectFlight('${flight.id}', '${searchParams.class}', ${searchParams.passengers})">
                                Select Flight
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    selectFlight(flightId, flightClass, passengers) {
        const flight = this.flights.find(f => f.id === flightId);
        if (!flight) return;

        this.currentBooking = {
            flight: flight,
            class: flightClass,
            passengers: parseInt(passengers),
            totalPrice: flight.price[flightClass] * parseInt(passengers),
            bookingId: this.generateBookingId(),
            status: 'pending',
            passengerDetails: [],
            selectedSeats: [],
            bookingDate: new Date().toISOString()
        };

        this.showSection('booking');
        this.updateBookingProgress(2);
        this.showPassengerForm();
    }

    showPassengerForm() {
        const bookingContent = document.getElementById('bookingContent');
        const passengers = this.currentBooking.passengers;
        
        let passengerForms = '';
        for (let i = 1; i <= passengers; i++) {
            passengerForms += `
                <div class="form-section">
                    <h4>Passenger ${i}</h4>
                    <div class="passenger-form">
                        <div class="input-group">
                            <label for="title${i}">Title</label>
                            <select id="title${i}" required>
                                <option value="">Select Title</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                                <option value="Dr">Dr</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="firstName${i}">First Name</label>
                            <input type="text" id="firstName${i}" required>
                        </div>
                        <div class="input-group">
                            <label for="lastName${i}">Last Name</label>
                            <input type="text" id="lastName${i}" required>
                        </div>
                        <div class="input-group">
                            <label for="email${i}">Email</label>
                            <input type="email" id="email${i}" required>
                        </div>
                        <div class="input-group">
                            <label for="phone${i}">Phone</label>
                            <input type="tel" id="phone${i}" required>
                        </div>
                        <div class="input-group">
                            <label for="dob${i}">Date of Birth</label>
                            <input type="date" id="dob${i}" required>
                        </div>
                    </div>
                </div>
            `;
        }

        bookingContent.innerHTML = `
            <div class="booking-summary">
                <h3>Flight Details</h3>
                <div class="flight-summary">
                    <p><strong>Flight:</strong> ${this.currentBooking.flight.airline} ${this.currentBooking.flight.id}</p>
                    <p><strong>Route:</strong> ${this.currentBooking.flight.from.name} → ${this.currentBooking.flight.to.name}</p>
                    <p><strong>Departure:</strong> ${this.currentBooking.flight.departTime}</p>
                    <p><strong>Arrival:</strong> ${this.currentBooking.flight.arrivalTime}</p>
                    <p><strong>Class:</strong> ${this.currentBooking.class.charAt(0).toUpperCase() + this.currentBooking.class.slice(1)}</p>
                    <p><strong>Passengers:</strong> ${this.currentBooking.passengers}</p>
                    <p><strong>Total Price:</strong> $${this.currentBooking.totalPrice}</p>
                </div>
            </div>
            
            <h3>Passenger Information</h3>
            <form id="passengerForm">
                ${passengerForms}
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="airlineSystem.showSection('home')">Back to Search</button>
                    <button type="submit" class="btn btn-primary">Continue to Seat Selection</button>
                </div>
            </form>
        `;

        document.getElementById('passengerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePassengerDetails();
        });
    }

    savePassengerDetails() {
        const passengers = this.currentBooking.passengers;
        const passengerDetails = [];

        for (let i = 1; i <= passengers; i++) {
            const passenger = {
                title: document.getElementById(`title${i}`).value,
                firstName: document.getElementById(`firstName${i}`).value,
                lastName: document.getElementById(`lastName${i}`).value,
                email: document.getElementById(`email${i}`).value,
                phone: document.getElementById(`phone${i}`).value,
                dateOfBirth: document.getElementById(`dob${i}`).value
            };

            // Validation
            if (!passenger.title || !passenger.firstName || !passenger.lastName || 
                !passenger.email || !passenger.phone || !passenger.dateOfBirth) {
                alert(`Please fill in all details for Passenger ${i}`);
                return;
            }

            passengerDetails.push(passenger);
        }

        this.currentBooking.passengerDetails = passengerDetails;
        this.updateBookingProgress(3);
        this.showSeatSelection();
    }

    showSeatSelection() {
        this.generateSeatMap();
        document.getElementById('seatModal').style.display = 'block';
    }

    generateSeatMap() {
        const seatGrid = document.getElementById('seatGrid');
        const rows = 20;
        const seatsPerRow = 6;
        const seatLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        seatGrid.innerHTML = '';
        
        for (let row = 1; row <= rows; row++) {
            for (let seat = 0; seat < seatsPerRow; seat++) {
                const seatNumber = `${row}${seatLabels[seat]}`;
                const seatElement = document.createElement('div');
                seatElement.className = 'seat';
                seatElement.textContent = seatNumber;
                seatElement.dataset.seat = seatNumber;
                
                // Randomly make some seats occupied
                if (Math.random() < 0.3) {
                    seatElement.classList.add('occupied');
                } else {
                    seatElement.classList.add('available');
                    seatElement.addEventListener('click', () => this.toggleSeat(seatElement));
                }
                
                seatGrid.appendChild(seatElement);
            }
        }
    }

    toggleSeat(seatElement) {
        const seatNumber = seatElement.dataset.seat;
        
        if (seatElement.classList.contains('selected')) {
            seatElement.classList.remove('selected');
            seatElement.classList.add('available');
            this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatNumber);
        } else if (this.selectedSeats.length < this.currentBooking.passengers) {
            seatElement.classList.remove('available');
            seatElement.classList.add('selected');
            this.selectedSeats.push(seatNumber);
        } else {
            alert(`You can only select ${this.currentBooking.passengers} seat(s).`);
        }
    }

    confirmSeatSelection() {
        if (this.selectedSeats.length !== this.currentBooking.passengers) {
            alert(`Please select exactly ${this.currentBooking.passengers} seat(s).`);
            return;
        }

        this.currentBooking.selectedSeats = [...this.selectedSeats];
        this.closeModal();
        this.updateBookingProgress(4);
        this.showPaymentForm();
    }

    showPaymentForm() {
        const bookingContent = document.getElementById('bookingContent');
        
        bookingContent.innerHTML = `
            <div class="booking-summary">
                <h3>Booking Summary</h3>
                <div class="flight-summary">
                    <p><strong>Flight:</strong> ${this.currentBooking.flight.airline} ${this.currentBooking.flight.id}</p>
                    <p><strong>Route:</strong> ${this.currentBooking.flight.from.name} → ${this.currentBooking.flight.to.name}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${this.currentBooking.flight.departTime} - ${this.currentBooking.flight.arrivalTime}</p>
                    <p><strong>Passengers:</strong> ${this.currentBooking.passengers}</p>
                    <p><strong>Seats:</strong> ${this.currentBooking.selectedSeats.join(', ')}</p>
                    <p><strong>Class:</strong> ${this.currentBooking.class.charAt(0).toUpperCase() + this.currentBooking.class.slice(1)}</p>
                    <p><strong>Total Amount:</strong> $${this.currentBooking.totalPrice}</p>
                </div>
            </div>
            
            <h3>Payment Information</h3>
            <form id="paymentForm" class="payment-form">
                <div class="form-section">
                    <h4>Credit Card Details</h4>
                    <div class="passenger-form">
                        <div class="input-group">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
                        </div>
                        <div class="input-group">
                            <label for="cardName">Cardholder Name</label>
                            <input type="text" id="cardName" required>
                        </div>
                        <div class="input-group">
                            <label for="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5" required>
                        </div>
                        <div class="input-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="123" maxlength="3" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="airlineSystem.updateBookingProgress(3); airlineSystem.showSeatSelection()">Back to Seats</button>
                    <button type="submit" class="btn btn-primary">Complete Booking ($${this.currentBooking.totalPrice})</button>
                </div>
            </form>
        `;

        // Add input formatting
        this.setupPaymentFormFormatting();

        document.getElementById('paymentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processPayment();
        });
    }

    setupPaymentFormFormatting() {
        // Format card number
        document.getElementById('cardNumber').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Format expiry date
        document.getElementById('expiryDate').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        // Format CVV
        document.getElementById('cvv').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    async processPayment() {
        // Show loading
        this.showLoadingSpinner();

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Hide loading
        this.hideLoadingSpinner();

        // Complete booking
        this.currentBooking.status = 'confirmed';
        this.currentBooking.confirmationDate = new Date().toISOString();
        
        // Save booking
        this.bookings.push({ ...this.currentBooking });
        this.saveBookings();

        // Show confirmation
        this.updateBookingProgress(5);
        this.showBookingConfirmation();
    }

    showBookingConfirmation() {
        const bookingContent = document.getElementById('bookingContent');
        
        bookingContent.innerHTML = `
            <div class="confirmation-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Booking Confirmed!</h2>
                <p>Your flight has been successfully booked.</p>
                
                <div class="confirmation-details">
                    <h3>Booking Details</h3>
                    <div class="detail-row">
                        <span>Booking ID:</span>
                        <strong>${this.currentBooking.bookingId}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Flight:</span>
                        <strong>${this.currentBooking.flight.airline} ${this.currentBooking.flight.id}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Route:</span>
                        <strong>${this.currentBooking.flight.from.name} → ${this.currentBooking.flight.to.name}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Date:</span>
                        <strong>${new Date().toLocaleDateString()}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Time:</span>
                        <strong>${this.currentBooking.flight.departTime} - ${this.currentBooking.flight.arrivalTime}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Passengers:</span>
                        <strong>${this.currentBooking.passengers}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Seats:</span>
                        <strong>${this.currentBooking.selectedSeats.join(', ')}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Total Paid:</span>
                        <strong>$${this.currentBooking.totalPrice}</strong>
                    </div>
                </div>
                
                <div class="confirmation-actions">
                    <button class="btn btn-primary" onclick="airlineSystem.showSection('bookings')">View My Bookings</button>
                    <button class="btn btn-secondary" onclick="airlineSystem.showSection('home')">Book Another Flight</button>
                </div>
            </div>
        `;

        // Reset current booking
        this.currentBooking = null;
        this.selectedSeats = [];
        this.currentStep = 1;
    }

    updateBookingProgress(step) {
        this.currentStep = step;
        
        document.querySelectorAll('.progress-step').forEach((stepElement, index) => {
            if (index + 1 <= step) {
                stepElement.classList.add('active');
            } else {
                stepElement.classList.remove('active');
            }
        });
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(sectionId).classList.add('active');
        
        if (sectionId === 'bookings') {
            this.displayBookings();
        }
    }

    displayBookings() {
        const bookingsList = document.getElementById('bookingsList');
        
        if (this.bookings.length === 0) {
            bookingsList.innerHTML = `
                <div class="no-bookings">
                    <i class="fas fa-plane-slash"></i>
                    <p>No bookings found</p>
                    <p>Start by searching for flights on the home page</p>
                </div>
            `;
        } else {
            bookingsList.innerHTML = this.bookings.map(booking => `
                <div class="booking-card">
                    <div class="booking-header">
                        <div class="booking-id">Booking ID: ${booking.bookingId}</div>
                        <div class="booking-status ${booking.status}">${booking.status.toUpperCase()}</div>
                    </div>
                    <div class="booking-details">
                        <div class="detail-row">
                            <span>Flight:</span>
                            <strong>${booking.flight.airline} ${booking.flight.id}</strong>
                        </div>
                        <div class="detail-row">
                            <span>Route:</span>
                            <strong>${booking.flight.from.name} → ${booking.flight.to.name}</strong>
                        </div>
                        <div class="detail-row">
                            <span>Date:</span>
                            <strong>${new Date(booking.bookingDate).toLocaleDateString()}</strong>
                        </div>
                        <div class="detail-row">
                            <span>Time:</span>
                            <strong>${booking.flight.departTime} - ${booking.flight.arrivalTime}</strong>
                        </div>
                        <div class="detail-row">
                            <span>Passengers:</span>
                            <strong>${booking.passengers}</strong>
                        </div>
                        <div class="detail-row">
                            <span>Seats:</span>
                            <strong>${booking.selectedSeats.join(', ')}</strong>
                        </div>
                        <div class="detail-row">
                            <span>Total:</span>
                            <strong>$${booking.totalPrice}</strong>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    generateBookingId() {
        return 'SL' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
    }

    showLoadingSpinner() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoadingSpinner() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    closeModal() {
        document.getElementById('seatModal').style.display = 'none';
        this.selectedSeats = [];
        
        // Reset seat selections
        document.querySelectorAll('.seat.selected').forEach(seat => {
            seat.classList.remove('selected');
            seat.classList.add('available');
        });
    }

    saveBookings() {
        localStorage.setItem('airlineBookings', JSON.stringify(this.bookings));
    }

    loadBookings() {
        const savedBookings = localStorage.getItem('airlineBookings');
        if (savedBookings) {
            this.bookings = JSON.parse(savedBookings);
        }
    }
}

// Initialize the airline reservation system
const airlineSystem = new AirlineReservationSystem();

// Additional CSS for confirmation page
const confirmationStyles = `
    .confirmation-success {
        text-align: center;
        padding: 2rem;
    }

    .success-icon {
        font-size: 4rem;
        color: #28a745;
        margin-bottom: 1rem;
    }

    .confirmation-success h2 {
        color: #1e3c72;
        margin-bottom: 0.5rem;
    }

    .confirmation-details {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        margin: 2rem 0;
        text-align: left;
    }

    .confirmation-details h3 {
        color: #1e3c72;
        margin-bottom: 1rem;
        text-align: center;
    }

    .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e1e5e9;
    }

    .detail-row:last-child {
        border-bottom: none;
        font-size: 1.1rem;
        font-weight: 600;
        color: #1e3c72;
    }

    .confirmation-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }

    .no-flights {
        text-align: center;
        padding: 3rem;
        color: #666;
    }

    .no-flights i {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }

    .payment-form .form-section {
        margin-bottom: 2rem;
    }

    .form-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        gap: 1rem;
    }

    @media (max-width: 768px) {
        .confirmation-actions,
        .form-actions {
            flex-direction: column;
        }
        
        .detail-row {
            flex-direction: column;
            gap: 0.25rem;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = confirmationStyles;
document.head.appendChild(styleSheet);