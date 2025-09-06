import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Calendar, MapPin, Users, Clock } from 'lucide-react'
import { states } from '../data/states'
import { packages, getPackagesByState, getPackagesByDuration } from '../data/packages'

const Packages = () => {
  const [filteredPackages, setFilteredPackages] = useState(packages)
  const [selectedState, setSelectedState] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const durations = [
    { id: 'all', name: 'All Durations' },
    { id: '1', name: '1 Day' },
    { id: '2', name: '2 Days' },
    { id: '5', name: '5 Days' }
  ]

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-3000', name: 'Under ₹3,000' },
    { id: '3000-5000', name: '₹3,000 - ₹5,000' },
    { id: '5000-10000', name: '₹5,000 - ₹10,000' },
    { id: '10000+', name: 'Above ₹10,000' }
  ]

  const filterPackages = () => {
    let filtered = packages

    if (selectedState !== 'all') {
      const stateName = states.find(s => s.id === selectedState)?.name
      filtered = filtered.filter(pkg => pkg.state === stateName)
    }

    if (selectedDuration !== 'all') {
      filtered = filtered.filter(pkg => pkg.duration === parseInt(selectedDuration))
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      if (max) {
        filtered = filtered.filter(pkg => pkg.price >= min && pkg.price <= max)
      } else {
        filtered = filtered.filter(pkg => pkg.price >= min)
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.village.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPackages(filtered)
  }

  useEffect(() => {
    filterPackages()
  }, [selectedState, selectedDuration, priceRange, searchTerm])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 container-custom h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl font-bold mb-4">Travel Packages</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Curated village experiences that immerse you in authentic local culture
            </p>
            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{packages.length} Packages</span>
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
      <section className="section-padding bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-charcoal">Filter by:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
              >
                <option value="all">All States</option>
                {states.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
              
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
              >
                {durations.map(duration => (
                  <option key={duration.id} value={duration.id}>{duration.name}</option>
                ))}
              </select>
              
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              {filteredPackages.length} Packages Found
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated village experiences
            </p>
          </motion.div>

          {filteredPackages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 text-lg mb-4">No packages found matching your criteria</div>
              <button
                onClick={() => {
                  setSelectedState('all')
                  setSelectedDuration('all')
                  setPriceRange('all')
                  setSearchTerm('')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card card-hover overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-charcoal px-2 py-1 rounded-full text-xs font-semibold">
                        {pkg.village}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-saffron text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {pkg.duration} Day{pkg.duration > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{pkg.village}, {pkg.state}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{pkg.duration} Day{pkg.duration > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>Max 8 people</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-charcoal mb-2">Includes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {pkg.includes.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {item}
                          </span>
                        ))}
                        {pkg.includes.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{pkg.includes.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">({pkg.reviews})</span>
                      </div>
                      <span className="text-xl font-bold text-saffron">₹{pkg.price.toLocaleString()}</span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="btn-primary flex-1">
                        Book Now
                      </button>
                      <Link
                        to={`/villages/${pkg.village.toLowerCase()}`}
                        className="btn-outline text-sm"
                      >
                        View Village
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>



      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-violet-600 to-purple-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for Your Village Adventure?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Book your authentic village experience and discover the rich culture and traditions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checkout" className="btn-secondary">
                Book Now
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

export default Packages
