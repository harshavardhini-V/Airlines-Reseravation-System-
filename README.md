# ✈️ SkyLine Airlines - Reservation System

A modern, responsive airline reservation system built with HTML, CSS, and JavaScript. This project demonstrates a complete flight booking workflow with an intuitive user interface and comprehensive functionality.

## 🌟 Features

### Core Functionality
- **Flight Search**: Search flights between 8 major cities with flexible date options
- **Trip Types**: Support for both round-trip and one-way flights
- **Multiple Classes**: Economy, Business, and First Class options
- **Passenger Management**: Handle multiple passengers per booking
- **Seat Selection**: Interactive seat map with visual seat selection
- **Payment Processing**: Simulated payment system with form validation
- **Booking Management**: View and manage all bookings with persistent storage

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Form Validation**: Comprehensive client-side validation with user-friendly error messages
- **Loading States**: Visual feedback during search and booking processes
- **Progress Tracking**: 5-step booking progress indicator

### Technical Features
- **Local Storage**: Persistent booking data across browser sessions
- **Dynamic Content**: Real-time flight generation with realistic pricing
- **Modal Dialogs**: Interactive seat selection and confirmation dialogs
- **Navigation**: Single-page application with smooth section transitions

## 🚀 Live Demo

**[View Live Demo](https://harshavardhini1108.github.io/airline-reservation-system/)**

## 📸 Screenshots

### Home Page - Flight Search
![Flight Search](screenshots/flight-search.png)

### Booking Process
![Booking Process](screenshots/booking-process.png)

### Seat Selection
![Seat Selection](screenshots/seat-selection.png)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript (ES6+)**: Object-oriented programming and DOM manipulation
- **Font Awesome**: Icons and visual elements
- **Local Storage API**: Data persistence

## 📁 Project Structure

```
airline-reservation/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── screenshots/        # Project screenshots
```

## 🎯 Key Components

### 1. Flight Search System
- City selection with 8 major destinations
- Date validation and trip type selection
- Passenger count and class selection
- Real-time form validation

### 2. Booking Workflow
- **Step 1**: Flight Selection
- **Step 2**: Passenger Information
- **Step 3**: Seat Selection
- **Step 4**: Payment Processing
- **Step 5**: Booking Confirmation

### 3. Data Management
- Dynamic flight generation with realistic data
- Booking persistence using localStorage
- Unique booking ID generation
- Status tracking and management

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshavardhini1108/airline-reservation-system.git
   cd airline-reservation-system
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application**
   - Open your browser and navigate to the local server URL
   - Start booking flights!

## 💻 Usage

### Booking a Flight

1. **Search Flights**
   - Select departure and destination cities
   - Choose your travel dates
   - Select number of passengers and class
   - Click "Search Flights"

2. **Select Flight**
   - Browse available flights
   - Compare prices and times
   - Click "Select Flight" on your preferred option

3. **Enter Passenger Details**
   - Fill in passenger information for each traveler
   - Ensure all required fields are completed
   - Click "Continue to Seat Selection"

4. **Choose Seats**
   - View the interactive seat map
   - Select seats for all passengers
   - Confirm your seat selection

5. **Payment**
   - Enter payment information
   - Review booking summary
   - Complete the booking

6. **Confirmation**
   - Receive booking confirmation with unique ID
   - View booking details
   - Access "My Bookings" for future reference

## 🎨 Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- Update CSS variables for consistent theming
- Customize responsive breakpoints

### Functionality
- Add new cities in the `generateSampleFlights()` method
- Modify pricing logic in `calculateBasePrice()`
- Extend booking features in the main class

### Branding
- Update airline name and logo in HTML
- Change color scheme in CSS
- Modify company information in the About section

## 🌐 Deployment Options

### GitHub Pages (Free)
1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (main/master)
4. Your site will be available at: `https://username.github.io/repository-name`

### Netlify (Free)
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Custom domain support available

### Vercel (Free)
1. Import project from GitHub
2. Automatic deployments
3. Excellent performance optimization

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with all functionality
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Streamlined interface optimized for small screens

## 🔧 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩‍💻 Author

**Harshavardhini V**
- GitHub: [@harshavardhini1108](https://github.com/harshavardhini1108)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- Portfolio: [Your Portfolio Website](https://your-portfolio.com)

## 🙏 Acknowledgments

- Font Awesome for icons
- Modern CSS techniques and best practices
- Responsive design principles
- User experience design patterns

## 📈 Future Enhancements

- [ ] Backend integration with real flight APIs
- [ ] User authentication and profiles
- [ ] Email confirmation system
- [ ] Multi-language support
- [ ] Advanced filtering and sorting
- [ ] Price alerts and notifications
- [ ] Loyalty program integration
- [ ] Mobile app development

---

⭐ **If you found this project helpful, please give it a star!** ⭐