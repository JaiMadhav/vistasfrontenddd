import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react'
import { getStateById } from '../data/states'
import { getVillagesByState } from '../data/villages'
import ExpandableVillageCard from '../components/ui/ExpandableVillageCard'

const StateDetail = () => {
  const { id } = useParams()
  const [state, setState] = useState(null)
  const [villages, setVillages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      const stateData = getStateById(id)
      if (stateData) {
        const villagesData = getVillagesByState(stateData.name)
        setState(stateData)
        setVillages(villagesData)
      }
      setLoading(false)
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-pacifico text-gray-800 mb-4">State not found</h1>
          <Link to="/states" className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-mukta">
            Back to States
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28 bg-cover bg-center bg-no-repeat min-h-[60vh] pt-32 md:pt-40"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/Images/${state.name.replace(' ', '')}.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <Link 
              to="/states" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 font-mukta"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to States
            </Link>
            <h1 className="text-6xl md:text-8xl font-pacifico text-white mb-8 drop-shadow-lg">
              {state.name}
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-source-serif drop-shadow-md leading-relaxed mb-8">
              {state.description}
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-mukta">{villages.length} Villages</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-6">
              Why Visit {state.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-source-serif">
              Discover the unique experiences and cultural treasures that make {state.name} special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {state.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl hover:shadow-lg transition-all duration-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-pacifico text-gray-800">{highlight}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Villages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-6">
              Explore {state.name} Villages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-source-serif">
              Click on any village card to expand and discover detailed information about authentic village experiences in {state.name}
            </p>
          </motion.div>

          {villages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 text-lg mb-4 font-mukta">No villages found for {state.name}</div>
              <Link
                to="/states"
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-mukta"
              >
                Back to States
              </Link>
            </motion.div>
          ) : (
            <ExpandableVillageCard villages={villages} />
          )}
        </div>
      </section>

      {/* Cultural Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-6">
              Cultural Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-source-serif">
              Learn about the rich cultural heritage and traditions of {state.name}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Traditional Arts",
                description: "Discover local handicrafts, folk art, and traditional skills passed down through generations",
                icon: "🎨"
              },
              {
                title: "Local Cuisine",
                description: "Experience authentic regional dishes and traditional cooking methods",
                icon: "🍽️"
              },
              {
                title: "Festivals & Events",
                description: "Participate in local celebrations and cultural events throughout the year",
                icon: "🎉"
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl hover:shadow-lg transition-all duration-200"
              >
                <div className="text-4xl mb-4">{insight.icon}</div>
                <h3 className="text-xl font-pacifico text-gray-800 mb-4">{insight.title}</h3>
                <p className="text-gray-600 font-source-serif">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-pacifico text-white mb-4">
              Ready to Explore {state.name}?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg font-source-serif">
              Book your authentic village experience and discover the rich culture and traditions of {state.name}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/packages" 
                className="bg-white text-gray-800 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-mukta"
              >
                View Packages
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-gray-800 transition-all duration-300 font-mukta"
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

export default StateDetail