import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Star, Plus, Send, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const Itinerary = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [itinerary, setItinerary] = useState(null)
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    travelers: '',
    interests: [],
    budget: '',
    startDate: ''
  })

  const interests = [
    'Cultural Heritage',
    'Traditional Crafts',
    'Local Cuisine',
    'Nature & Wildlife',
    'Adventure Activities',
    'Spiritual Experiences',
    'Photography',
    'Relaxation'
  ]

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true)
    
    // Simulate AI itinerary generation
    setTimeout(() => {
      const generatedItinerary = {
        id: 'IT-001',
        destination: formData.destination,
        duration: formData.duration,
        travelers: formData.travelers,
        startDate: formData.startDate,
        totalCost: 25000,
        days: [
          {
            day: 1,
            date: '2024-02-15',
            title: 'Arrival & Welcome',
            activities: [
              {
                time: '10:00 AM',
                activity: 'Arrive at Jaisalmer Railway Station',
                description: 'Meet your guide and transfer to Khuri village',
                duration: '1 hour'
              },
              {
                time: '11:30 AM',
                activity: 'Village Welcome Ceremony',
                description: 'Traditional welcome with folk music and refreshments',
                duration: '2 hours'
              },
              {
                time: '02:00 PM',
                activity: 'Lunch at Local Home',
                description: 'Authentic Rajasthani thali prepared by local family',
                duration: '1 hour'
              },
              {
                time: '03:30 PM',
                activity: 'Camel Safari Preparation',
                description: 'Learn about camels and desert safety',
                duration: '1 hour'
              },
              {
                time: '05:00 PM',
                activity: 'Sunset Camel Safari',
                description: 'Experience the golden desert sunset on camelback',
                duration: '2 hours'
              },
              {
                time: '07:30 PM',
                activity: 'Desert Camp Dinner',
                description: 'Traditional dinner under the stars with folk music',
                duration: '2 hours'
              }
            ]
          },
          {
            day: 2,
            date: '2024-02-16',
            title: 'Cultural Immersion',
            activities: [
              {
                time: '06:00 AM',
                activity: 'Sunrise Yoga',
                description: 'Morning yoga session in the desert',
                duration: '1 hour'
              },
              {
                time: '08:00 AM',
                activity: 'Traditional Breakfast',
                description: 'Local breakfast with chai and snacks',
                duration: '1 hour'
              },
              {
                time: '09:30 AM',
                activity: 'Craft Workshop',
                description: 'Learn traditional embroidery from local artisans',
                duration: '3 hours'
              },
              {
                time: '01:00 PM',
                activity: 'Village Lunch',
                description: 'Home-cooked meal with local family',
                duration: '1 hour'
              },
              {
                time: '02:30 PM',
                activity: 'Village Walk',
                description: 'Explore the village and meet local craftspeople',
                duration: '2 hours'
              },
              {
                time: '05:00 PM',
                activity: 'Folk Music Evening',
                description: 'Traditional music and dance performance',
                duration: '2 hours'
              }
            ]
          }
        ],
        recommendations: [
          {
            type: 'package',
            name: 'Khuri Desert Adventure',
            price: 4500,
            description: 'Perfect addition to your itinerary'
          },
          {
            type: 'handicraft',
            name: 'Handwoven Dhurrie',
            price: 2500,
            description: 'Take home a piece of Khuri'
          }
        ]
      }
      
      setItinerary(generatedItinerary)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-beige-sand">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container-custom py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-charcoal mb-2">AI Itinerary Planner</h1>
            <p className="text-gray-600">Get personalized village experience recommendations</p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        {!itinerary ? (
          <div className="max-w-4xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-charcoal mb-6">Plan Your Perfect Trip</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Destination *
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                    >
                      <option value="">Select Destination</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="kerala">Kerala</option>
                      <option value="west-bengal">West Bengal</option>
                      <option value="assam">Assam</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Duration *
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                    >
                      <option value="">Select Duration</option>
                      <option value="1">1 Day</option>
                      <option value="2">2 Days</option>
                      <option value="3">3 Days</option>
                      <option value="5">5 Days</option>
                      <option value="7">1 Week</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Number of Travelers *
                    </label>
                    <input
                      type="number"
                      value={formData.travelers}
                      onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                      required
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Budget Range *
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                    >
                      <option value="">Select Budget</option>
                      <option value="budget">Budget (₹5,000 - ₹15,000)</option>
                      <option value="mid">Mid-range (₹15,000 - ₹30,000)</option>
                      <option value="luxury">Luxury (₹30,000+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-4">
                    Interests (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="text-saffron focus:ring-saffron"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating Itinerary...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Generate Itinerary
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: "🤖",
                  title: "AI-Powered",
                  description: "Advanced algorithms create personalized experiences"
                },
                {
                  icon: "🎯",
                  title: "Tailored",
                  description: "Customized to your interests and preferences"
                },
                {
                  icon: "⚡",
                  title: "Instant",
                  description: "Get your itinerary in seconds, not hours"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          /* Itinerary Display */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Itinerary Header */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-charcoal mb-2">
                    Your {itinerary.duration}-Day {itinerary.destination} Adventure
                  </h2>
                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(itinerary.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{itinerary.travelers} traveler{itinerary.travelers > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      <span>AI Generated</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-charcoal">₹{itinerary.totalCost.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Estimated Total</div>
                  <button className="btn-outline mt-2">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Daily Itinerary */}
            <div className="space-y-8">
              {itinerary.days.map((day, dayIndex) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-saffron to-terracotta p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Day {day.day}</h3>
                    <p className="text-lg opacity-90">{day.title}</p>
                    <p className="text-sm opacity-75">{new Date(day.date).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex gap-4">
                          <div className="flex-shrink-0 w-20 text-right">
                            <div className="text-sm font-semibold text-saffron">{activity.time}</div>
                            <div className="text-xs text-gray-500">{activity.duration}</div>
                          </div>
                          
                          <div className="flex-shrink-0 w-4 relative">
                            <div className="w-4 h-4 bg-saffron rounded-full"></div>
                            {activityIndex < day.activities.length - 1 && (
                              <div className="w-0.5 h-16 bg-gray-200 mx-auto mt-2"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 pb-6">
                            <h4 className="font-semibold text-charcoal mb-1">{activity.activity}</h4>
                            <p className="text-gray-600 text-sm">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-8 mt-8"
            >
              <h3 className="text-2xl font-bold text-charcoal mb-6">Recommended Add-ons</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {itinerary.recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-charcoal">{rec.name}</h4>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                      <span className="text-lg font-bold text-saffron">₹{rec.price.toLocaleString()}</span>
                    </div>
                    
                    <button className="btn-primary w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Itinerary
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <button
                onClick={() => setItinerary(null)}
                className="btn-outline"
              >
                Create New Itinerary
              </button>
              <Link to="/packages" className="btn-primary">
                Book This Trip
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Itinerary
