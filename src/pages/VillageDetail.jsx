import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Clock, Users, Star, Heart } from 'lucide-react'
import { getVillageById } from '../data/villages'
import { states } from '../data/states'

const VillageDetail = () => {
  const { id } = useParams()
  const [village, setVillage] = useState(null)
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      const villageData = getVillageById(id)
      if (villageData) {
        // Find the state that contains this village
        const stateData = states.find(s => s.villages.includes(villageData.id))
        setVillage(villageData)
        setState(stateData)
      }
      setLoading(false)
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    )
  }

  if (!village) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-4">Village not found</h1>
          <Link to="/villages" className="btn-primary">Back to Villages</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96">
        <img
          src={village.image}
          alt={village.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        
        <div className="absolute top-6 left-6">
          <Link
            to={`/states/${village.state}`}
            className="bg-white/90 text-charcoal px-3 py-1 rounded-full text-sm font-semibold hover:bg-white transition-colors"
          >
            {state?.name}
          </Link>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-pacifico mb-2">{village.name}</h1>
            <p className="body-text text-lg mb-4">{village.location}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{village.coordinates}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>4.8/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-pacifico text-charcoal mb-4">About {village.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{village.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-charcoal mb-3">Location</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{village.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Best Time: Oct-Mar</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-charcoal mb-3">Quick Info</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Population: ~2,500</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Visit Duration: 1-3 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="card p-6 sticky top-24"
              >
                <h3 className="text-lg font-semibold text-charcoal mb-4">Plan Your Visit</h3>
                <div className="space-y-4">
                  <Link to="/packages" className="btn-primary w-full text-center">
                    View Packages
                  </Link>
                  <Link to="/handicrafts" className="btn-outline w-full text-center">
                    Shop Handicrafts
                  </Link>
                  <Link to="/itinerary" className="btn-secondary w-full text-center">
                    Plan Itinerary
                  </Link>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-charcoal mb-3">Contact</h4>
                  <Link to="/contact" className="text-saffron hover:text-terracotta transition-colors">
                    Get in touch with us
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section className="section-padding bg-beige-sand">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">Featured Event</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the unique cultural events that make {village.name} special
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card card-hover max-w-4xl mx-auto overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-full">
                <img
                  src={village.image}
                  alt={village.event}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-4">{village.event}</h3>
                <p className="text-gray-600 mb-6">
                  Experience the vibrant culture and traditions of {village.name} through this special event. 
                  Immerse yourself in local customs, music, and celebrations.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Annual Event</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>All Ages Welcome</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">Activities & Experiences</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover authentic activities that will give you a true taste of village life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {village.activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card card-hover p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-saffron to-terracotta rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">{activity}</h3>
                <p className="text-gray-600 mb-4">
                  Immerse yourself in this authentic village experience and learn from local experts.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">2-4 hours</span>
                  <span className="text-saffron font-semibold">₹500-1500</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Handicraft Section */}
      <section className="section-padding bg-beige-sand">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">Local Handicraft</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take home a piece of {village.name}'s culture with authentic local handicrafts
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card card-hover max-w-4xl mx-auto overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-full">
                <img
                  src={village.image}
                  alt={village.handicraft}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-4">{village.handicraft}</h3>
                <p className="text-gray-600 mb-6">
                  Handcrafted by local artisans using traditional techniques passed down through generations. 
                  Each piece tells a story of {village.name}'s rich cultural heritage.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">4.9</span>
                  </div>
                  <Link to="/handicrafts" className="btn-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
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
              Ready to Visit {village.name}?
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

export default VillageDetail
