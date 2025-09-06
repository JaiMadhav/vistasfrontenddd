import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Star, ShoppingCart } from 'lucide-react'
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
    description: item.description,
    content: (
      <div className="h-full w-full bg-white rounded-lg overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
            {item.village}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-pacifico font-semibold">{item.name}</h3>
          <p className="text-sm opacity-90 font-montserrat">{item.category}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-xs opacity-90 font-montserrat">({item.reviews})</span>
            </div>
            <span className="text-lg font-bold font-montserrat">₹{item.price.toLocaleString()}</span>
          </div>
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
            className="text-white"
          >
            <h1 className="text-5xl font-bold mb-4">Handicraft Marketplace</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Discover authentic handcrafted treasures from India's villages
            </p>
            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span>{handicrafts.length} Items</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>4.8/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-montserrat font-semibold text-gray-800">Filter by:</span>
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

      {/* Handicrafts Sticky Scroll */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
              Each piece is handcrafted by local artisans using traditional techniques
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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">Why Choose Our Handicrafts?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each piece tells a story of tradition, craftsmanship, and cultural heritage
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
                className="text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Support Local Artisans
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Every purchase helps preserve traditional crafts and supports village communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checkout" className="btn-secondary">
                View Cart
              </Link>
              <Link to="/contact" className="btn-outline text-white border-white hover:bg-white hover:text-deep-green">
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
