import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, ShoppingCart, MapPin, Package } from 'lucide-react'
import { states } from '../data/states'
import { handicrafts, getHandicraftsByState, getHandicraftsByCategory } from '../data/handicrafts'
import { StickyScroll } from '../components/ui/sticky-scroll-reveal'
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input'

const Handicrafts = () => {
  const [filteredHandicrafts, setFilteredHandicrafts] = useState(handicrafts)
  const [selectedState, setSelectedState] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState([])

  // Add to cart function
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
    // Update localStorage for navbar cart count
    const newCart = existingItem 
      ? cart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...cart, { ...item, quantity: 1 }]
    localStorage.setItem('cart', JSON.stringify(newCart))
    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Textiles', name: 'Textiles' },
    { id: 'Pottery', name: 'Pottery' },
    { id: 'Jewelry', name: 'Jewelry' },
    { id: 'Home Decor', name: 'Home Decor' },
    { id: 'Sculpture', name: 'Sculpture' },
    { id: 'Leather', name: 'Leather' },
    { id: 'Art', name: 'Art & Paintings' },
    { id: 'Metalwork', name: 'Metalwork' },
    { id: 'Food', name: 'Food & Spices' },
    { id: 'Toys', name: 'Toys' }
  ]

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-1000', name: 'Under ₹1,000' },
    { id: '1000-3000', name: '₹1,000 - ₹3,000' },
    { id: '3000-5000', name: '₹3,000 - ₹5,000' },
    { id: '5000+', name: 'Above ₹5,000' }
  ]

  const filterHandicrafts = () => {
    let filtered = handicrafts

    if (selectedState !== 'all') {
      const stateName = states.find(s => s.id === selectedState)?.name
      filtered = filtered.filter(item => item.state === stateName)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      if (max) {
        filtered = filtered.filter(item => item.price >= min && item.price <= max)
      } else {
        filtered = filtered.filter(item => item.price >= min)
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.village.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredHandicrafts(filtered)
  }

  useEffect(() => {
    filterHandicrafts()
  }, [selectedState, selectedCategory, priceRange, searchTerm])

  // Prepare content for Sticky Scroll
  const stickyContent = filteredHandicrafts.map(item => ({
    title: item.name,
    description: `${item.village}, ${item.state} • ${item.category} • ₹${item.price.toLocaleString()}`,
    content: (
      <div className="h-full w-full bg-white rounded-lg overflow-hidden relative group">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/Images/landscape-bg.jpg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Village Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-mukta font-semibold">
            {item.village}
          </span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-mukta">
            {item.category}
          </span>
        </div>
        
        {/* Bottom Content */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-pacifico font-semibold mb-2">{item.name}</h3>
          <p className="text-sm opacity-90 font-source-serif mb-3 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-mukta">{item.state}</span>
            </div>
            <span className="text-xl font-bold font-mukta">₹{item.price.toLocaleString()}</span>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(item)}
            className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-mukta"
          >
            Add to Cart
          </button>
        </div>
      </div>
    )
  }))

  const searchPlaceholders = [
    "Search handicrafts...",
    "Find by village...",
    "Search by category..."
  ]

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log('Search submitted:', searchTerm)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 container-custom h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center"
          >
            <h1 className="text-6xl md:text-8xl font-pacifico mb-6 drop-shadow-lg">
              Handicrafts
            </h1>
            <p className="text-2xl md:text-3xl mb-8 max-w-4xl mx-auto font-source-serif drop-shadow-md leading-relaxed">
              Discover authentic handcrafted treasures from India's villages - each piece tells a story of tradition and craftsmanship
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6" />
                <span className="font-mukta">{handicrafts.length} Unique Items</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                <span className="font-mukta">25 Villages</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-4">
              Find Your Perfect Craft
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-source-serif">
              Filter through our collection of authentic handicrafts from villages across India
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-4">
              <Filter className="w-6 h-6 text-blue-600" />
              <span className="font-mukta font-semibold text-gray-800 text-lg">Filter by:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-montserrat"
              >
                <option value="all">All States</option>
                {states.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-montserrat"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-montserrat"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="max-w-md mx-auto">
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={handleSearchSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Handicrafts Display */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-6">
              {filteredHandicrafts.length} Handicrafts Found
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-source-serif">
              Each piece is handcrafted by local artisans using traditional techniques passed down through generations
            </p>
          </motion.div>

          {filteredHandicrafts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 text-lg mb-4 font-montserrat">No handicrafts found matching your criteria</div>
              <button
                onClick={() => {
                  setSelectedState('all')
                  setSelectedCategory('all')
                  setPriceRange('all')
                  setSearchTerm('')
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <StickyScroll
                content={stickyContent}
                contentClassName="rounded-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-6">
              Why Choose Our Handicrafts?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-source-serif">
              Each piece tells a story of tradition, craftsmanship, and cultural heritage passed down through generations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Craftsmanship",
                description: "Handcrafted by skilled artisans using traditional techniques",
                icon: "🛠️"
              },
              {
                title: "Fair Trade",
                description: "Supporting local communities and preserving cultural heritage",
                icon: "🤝"
              },
              {
                title: "Unique Pieces",
                description: "Each item is one-of-a-kind with its own character and story",
                icon: "✨"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-pacifico font-semibold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-source-serif leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-white mb-6 drop-shadow-lg">
              Support Local Artisans
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-source-serif drop-shadow-md">
              Every purchase helps preserve traditional crafts and supports village communities across India
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/checkout" 
                className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-mukta"
              >
                View Cart
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:-translate-y-1 font-mukta"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Handicrafts
