import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Star } from 'lucide-react'
import { getStateById } from '../data/states'
import { getVillagesByState } from '../data/villages'
import GlowingEffect from '../components/ui/GlowingEffect'

const StateDetail = () => {
  const { id } = useParams()
  const [state, setState] = useState(null)
  const [villages, setVillages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      const stateData = getStateById(id)
      if (stateData) {
        const villagesData = getVillagesByState(id)
        setState(stateData)
        setVillages(villagesData)
      }
      setLoading(false)
    }

    fetchData()
  }, [id])

  // Smooth scroll to villages section when component mounts
  useEffect(() => {
    if (!loading && state) {
      const timer = setTimeout(() => {
        const villagesSection = document.getElementById('villages-section')
        if (villagesSection) {
          villagesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [loading, state])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    )
  }

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-4">State not found</h1>
          <Link to="/states" className="btn-primary">Back to States</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-96 bg-gradient-to-br from-saffron via-terracotta to-deep-green"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${state.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 container-custom h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="hero-title mb-4">{state.name}</h1>
            <p className="body-text text-xl mb-6 max-w-2xl">{state.description}</p>
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

      {/* Highlights Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="section-title text-charcoal mb-4">Highlights</h2>
            <p className="body-text text-gray-600 max-w-2xl mx-auto">
              Discover the unique experiences and cultural treasures that make {state.name} special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card card-hover p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-saffron to-terracotta rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">{highlight}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Villages Section */}
      <section id="villages-section" className="section-padding bg-beige-sand">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">Explore Villages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in the authentic culture and traditions of {state.name}'s villages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villages.map((village, index) => (
              <motion.div
                key={village.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card card-hover overflow-hidden flex flex-col"
              >
                <div className="relative h-48">
                  <img
                    src={village.image}
                    alt={village.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{village.name}</h3>
                    <p className="text-sm opacity-90">{village.location}</p>
                  </div>
                </div>
                                 <div className="p-6 flex flex-col flex-grow">
                   <p className="text-gray-600 mb-4 line-clamp-3">{village.description}</p>
                   <div className="flex items-center justify-between mt-auto">
                                         <div className="flex items-center gap-2 text-sm text-gray-500">
                       <Calendar className="w-4 h-4" />
                       <span>{village.event.name}</span>
                     </div>
                    <Link
                      to={`/villages/${village.id}`}
                      className="btn-primary text-sm"
                    >
                      Explore Village
                    </Link>
                  </div>
                </div>
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
              Ready to Explore {state.name}?
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

export default StateDetail
