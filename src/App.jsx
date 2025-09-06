import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import AirbnbNavigation from './components/ui/AirbnbNavigation'
import Footer from './components/ui/Footer'
import ChatbotWidget from './components/ChatbotWidget'
import LoadingSpinner from './components/LoadingSpinner'
import ScrollToTop from './components/ScrollToTop'
import { useZoomResponsive } from './hooks/useZoomResponsive'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const States = lazy(() => import('./pages/States'))
const StateDetail = lazy(() => import('./pages/StateDetail'))
const VillageDetail = lazy(() => import('./pages/VillageDetail'))
const Handicrafts = lazy(() => import('./pages/Handicrafts'))
const Packages = lazy(() => import('./pages/Packages'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Orders = lazy(() => import('./pages/Orders'))
const Bookings = lazy(() => import('./pages/Bookings'))
const Itinerary = lazy(() => import('./pages/Itinerary'))
const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))

function App() {
  useZoomResponsive();
  
  return (
    <div className="min-h-screen zoom-responsive">
      <ScrollToTop />
      <AirbnbNavigation />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/states" element={<States />} />
            <Route path="/states/:id" element={<StateDetail />} />
            <Route path="/villages/:id" element={<VillageDetail />} />
            <Route path="/handicrafts" element={<Handicrafts />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  )
}

export default App