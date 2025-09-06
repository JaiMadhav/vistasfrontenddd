import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Star, Filter } from 'lucide-react'
import { states } from '../data/states'
import { villages } from '../data/villages'
import { StickyScroll } from '../components/ui/sticky-scroll-reveal'
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input'

const Villages = () => {
  const [filteredVillages, setFilteredVillages] = useState(villages)
  const [selectedState, setSelectedState] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    let filtered = villages

    if (selectedState !== 'all') {
      const stateName = states.find(s => s.id === selectedState)?.name
      filtered = filtered.filter(village => village.state === stateName?.toLowerCase())
    }

    if (searchTerm) {
      filtered = filtered.filter(village =>
        village.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        village.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredVillages(filtered)
  }, [selectedState, searchTerm])

  // Prepare content for Sticky Scroll
  const stickyContent = filteredVillages.map(village => ({
    title: village.name,
    description: village.description,
    content: (
      <div className="h-full w-full bg-white rounded-lg overflow-hidden">
        <img
          src={village.image}
          alt={village.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-pacifico font-semibold">{village.name}</h3>
          <p className="text-sm opacity-90 font-montserrat">{village.location}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-montserrat">
              {village.state}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }))

  const searchPlaceholders = [
    "Search villages...",
    "Find by location...",
    "Search by name..."
  ]

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log('Search submitted:', searchTerm)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 container-custom h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="hero-title mb-4">Discover Villages</h1>
            <p className="body-text text-xl mb-6 max-w-2xl">
              Experience authentic rural life and cultural traditions across India's most beautiful villages
            </p>
            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{villages.length} Villages</span>
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat"
              >
                <option value="all">All States</option>
                {states.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
              
              <div className="w-full sm:w-80">
                <PlaceholdersAndVanishInput
                  placeholders={searchPlaceholders}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onSubmit={handleSearchSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villages Sticky Scroll */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-6">
              {filteredVillages.length} Villages Found
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
              Explore authentic village experiences and immerse yourself in local culture and traditions
            </p>
          </motion.div>

          {filteredVillages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 text-lg mb-4 font-montserrat">No villages found matching your criteria</div>
              <button
                onClick={() => {
                  setSelectedState('all')
                  setSearchTerm('')
                }}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
            <h2 className="section-title text-charcoal mb-4">Why Choose Village Tourism?</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">
              Experience authentic rural life and cultural traditions that you won't find anywhere else
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Experience",
                description: "Immerse yourself in real village life, not tourist traps",
                icon: "🏘️"
              },
              {
                title: "Cultural Immersion",
                description: "Learn traditional crafts, music, and local customs",
                icon: "🎭"
              },
              {
                title: "Sustainable Tourism",
                description: "Support local communities and preserve cultural heritage",
                icon: "🌱"
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
                <h3 className="text-xl font-pacifico text-charcoal mb-2">{feature.title}</h3>
                <p className="body-text text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-deep-green to-leaf-green">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience Village Life?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Book your authentic village experience and discover the rich culture and traditions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages" className="btn-secondary">
                View Packages
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

export default Villages
