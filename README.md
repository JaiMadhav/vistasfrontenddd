# 🌍 Vistas Frontend - Discover India's Hidden Villages

A production-quality React frontend for Vistas, showcasing authentic Indian village experiences, handicrafts, and cultural tours across 5 states.

## ✨ Features

### 🎨 Design System
- **Brand Colors**: Saffron (#E7A53A), Terracotta (#D27A2C), Deep Green (#2E7D32), Leaf Green (#3E8E41), Beige Sand (#F3EAD9), Charcoal (#0F1A14), Golden Accent (#FFD27A)
- **Typography**: Poppins (headings), Inter (body)
- **Style**: Warm earthy gradients, lotus + temple aesthetic, soft shadows, rounded corners
- **Responsive**: Mobile-first design with perfect tablet and desktop experiences

### 🚀 Core Functionality
- **States Exploration**: 5 states (Rajasthan, Gujarat, Kerala, West Bengal, Assam)
- **Village Discovery**: 25 authentic villages with detailed experiences
- **Handicraft Marketplace**: 25 traditional handicrafts with filtering
- **Package Tours**: 75 curated packages (3 per village)
- **AI Itinerary Planning**: Smart trip planning with AI assistance
- **Chatbot Widget**: Floating chat assistant for customer support
- **Cart & Checkout**: Seamless booking with Razorpay integration

### 📱 User Experience
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Elements**: Hover effects, loading states, micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Lazy loading, code splitting, optimized images

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling and validation
- **React Icons** - Icon library
- **Mapbox GL** - Interactive maps
- **React Hot Toast** - Notification system

## 📁 Project Structure

```
vistas-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ChatbotWidget.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── States.jsx
│   │   ├── StateDetail.jsx
│   │   ├── Villages.jsx
│   │   ├── VillageDetail.jsx
│   │   ├── Handicrafts.jsx
│   │   ├── Packages.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── Bookings.jsx
│   │   └── Itinerary.jsx
│   ├── data/              # Static data and mock APIs
│   │   ├── states.js
│   │   ├── villages.js
│   │   ├── handicrafts.js
│   │   └── packages.js
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vistas-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Key Pages & Features

### Home Page (`/`)
- Hero section with gradient background and lotus pattern
- State previews with hover animations
- Customer testimonials
- Statistics showcase
- Call-to-action sections

### States Page (`/states`)
- Grid layout of all 5 states
- State cards with images, descriptions, and highlights
- Interactive hover effects
- Navigation to state details

### State Detail (`/states/:id`)
- State overview with map integration
- Village listings with filtering
- Cultural highlights
- Local experiences

### Villages Page (`/villages`)
- All 25 villages in a searchable grid
- Filter by state, activities, or price
- Village cards with key information
- Quick booking options

### Village Detail (`/villages/:id`)
- Hero section with village images
- Interactive map showing location
- Event calendar (1 per village)
- Activities showcase (3 per village)
- Packages display (3 per village)
- Handicraft showcase (1 per village)

### Handicrafts Marketplace (`/handicrafts`)
- 25 traditional handicrafts
- Advanced filtering (state, village, category, price)
- Product cards with images and descriptions
- Shopping cart integration
- Wishlist functionality

### Packages (`/packages`)
- 75 curated packages (3 per village)
- Filter by duration, price, and location
- Package cards with itineraries
- Booking system integration
- Special themed add-ons

### AI Itinerary Planner (`/itinerary`)
- Smart form for trip preferences
- AI-powered itinerary generation
- Interactive timeline display
- Package integration
- Export and sharing options

### Cart & Checkout (`/checkout`)
- Orders (handicrafts) + Bookings (packages)
- Razorpay payment integration
- Order summary and confirmation
- Email notifications

### User Dashboard
- **Orders** (`/orders`) - Past handicraft purchases
- **Bookings** (`/bookings`) - Past package bookings
- Order tracking and history

## 🎨 Design System

### Colors
```css
--saffron: #E7A53A
--terracotta: #D27A2C
--deep-green: #2E7D32
--leaf-green: #3E8E41
--beige-sand: #F3EAD9
--charcoal: #0F1A14
--golden-accent: #FFD27A
```

### Typography
- **Headings**: Poppins (300, 400, 500, 600, 700)
- **Body**: Inter (300, 400, 500, 600)

### Components
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.btn-outline` - Outline style buttons
- `.card` - Standard card component
- `.card-hover` - Hover effects for cards
- `.gradient-text` - Text with gradient overlay
- `.gradient-bg` - Background with gradient

## 🔧 Customization

### Adding New States
Edit `src/data/states.js`:
```javascript
{
  id: 'new-state',
  name: 'New State',
  description: 'State description',
  image: 'image-url',
  color: 'from-saffron to-terracotta',
  villages: ['village1', 'village2'],
  highlights: ['Highlight 1', 'Highlight 2'],
  coordinates: [lat, lng]
}
```

### Adding New Villages
Edit `src/data/villages.js`:
```javascript
{
  id: 'new-village',
  name: 'New Village',
  state: 'state-id',
  location: 'City',
  description: 'Village description',
  image: 'image-url',
  coordinates: [lat, lng],
  event: { /* event details */ },
  activities: [/* 3 activities */],
  handicraft: { /* handicraft details */ }
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of page components
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Caching**: React Query for efficient data caching
- **Animations**: Hardware-accelerated CSS transitions

## 🔒 Security Features

- **Input Validation**: Form validation with React Hook Form
- **XSS Protection**: Proper data sanitization
- **CSRF Protection**: Secure API calls
- **Environment Variables**: Secure configuration management

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📦 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically on push

### Netlify
1. Connect repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `dist` folder to your web server
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: hello@vistas.in
- Documentation: [docs.vistas.in](https://docs.vistas.in)
- Issues: [GitHub Issues](https://github.com/vistas/frontend/issues)

---

**Built with ❤️ for authentic Indian village experiences**
