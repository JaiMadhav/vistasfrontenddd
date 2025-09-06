import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Eye, Download, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const Bookings = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Sample bookings data - in a real app, this would come from an API
  const bookings = [
    {
      id: "BK-001",
      packageName: "Khuri Desert Adventure",
      village: "Khuri",
      state: "Rajasthan",
      date: "2024-02-15",
      duration: 2,
      guests: 2,
      status: "confirmed",
      price: 9000,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200",
      guide: "Rajesh Kumar",
      pickup: "Jaisalmer Railway Station",
      rating: 4.8
    },
    {
      id: "BK-002",
      packageName: "Bagru Cultural Weekend",
      village: "Bagru",
      state: "Rajasthan",
      date: "2024-01-20",
      duration: 2,
      guests: 4,
      status: "completed",
      price: 15200,
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200",
      guide: "Priya Sharma",
      pickup: "Jaipur Airport",
      rating: 4.9
    },
    {
      id: "BK-003",
      packageName: "Hodka Embroidery Workshop",
      village: "Hodka",
      state: "Gujarat",
      date: "2024-03-10",
      duration: 1,
      guests: 1,
      status: "upcoming",
      price: 2200,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200",
      guide: "Meera Patel",
      pickup: "Bhuj Bus Stand",
      rating: null
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-blue-600 bg-blue-50'
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'upcoming':
        return 'text-yellow-600 bg-yellow-50'
      case 'cancelled':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed'
      case 'completed':
        return 'Completed'
      case 'upcoming':
        return 'Upcoming'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Unknown'
    }
  }

  const filteredBookings = selectedStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedStatus)

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
            <h1 className="text-3xl font-bold text-charcoal mb-2">My Bookings</h1>
            <p className="text-gray-600">Manage your village experience bookings</p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-charcoal">Filter by Status:</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'all'
                    ? 'bg-saffron text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Bookings
              </button>
              <button
                onClick={() => setSelectedStatus('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'upcoming'
                    ? 'bg-saffron text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setSelectedStatus('confirmed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'confirmed'
                    ? 'bg-saffron text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setSelectedStatus('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'completed'
                    ? 'bg-saffron text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-sm p-12 text-center"
            >
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">No Bookings Found</h3>
              <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
              <Link to="/packages" className="btn-primary">
                View Packages
              </Link>
            </motion.div>
          ) : (
            filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Image */}
                  <div className="lg:col-span-1">
                    <img
                      src={booking.image}
                      alt={booking.packageName}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-2 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-charcoal mb-1">{booking.packageName}</h3>
                            <p className="text-gray-600">{booking.village}, {booking.state}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="font-medium text-charcoal">{new Date(booking.date).toLocaleDateString()}</div>
                              <div className="text-gray-500">{booking.duration} day{booking.duration > 1 ? 's' : ''}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="font-medium text-charcoal">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</div>
                              <div className="text-gray-500">Travelers</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="font-medium text-charcoal">{booking.pickup}</div>
                              <div className="text-gray-500">Pickup</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="font-medium text-charcoal">{booking.guide}</div>
                              <div className="text-gray-500">Guide</div>
                            </div>
                          </div>
                        </div>

                        {booking.rating && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(booking.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({booking.rating})</span>
                          </div>
                        )}
                      </div>

                      <div className="lg:text-right">
                        <div className="text-2xl font-bold text-charcoal mb-2">₹{booking.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500 mb-4">Total Amount</div>
                        
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/villages/${booking.village.toLowerCase()}`}
                            className="btn-outline text-sm"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Village
                          </Link>
                          
                          <button className="btn-outline text-sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download Voucher
                          </button>
                          
                          {booking.status === 'upcoming' && (
                            <button className="btn-primary text-sm">
                              Modify Booking
                            </button>
                          )}
                          
                          {booking.status === 'completed' && (
                            <button className="btn-secondary text-sm">
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Empty State for No Bookings */}
        {filteredBookings.length === 0 && selectedStatus !== 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm p-12 text-center"
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">No {getStatusText(selectedStatus)} Bookings</h3>
            <p className="text-gray-600 mb-6">You don't have any {getStatusText(selectedStatus).toLowerCase()} bookings.</p>
            <button
              onClick={() => setSelectedStatus('all')}
              className="btn-primary"
            >
              View All Bookings
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Bookings
