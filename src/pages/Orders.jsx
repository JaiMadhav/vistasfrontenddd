import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Calendar, MapPin, Eye, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Sample orders data - in a real app, this would come from an API
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      items: [
        {
          id: 1,
          name: "Handwoven Dhurrie",
          village: "Bishnoi",
          price: 2500,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=100"
        }
      ],
      total: 2950,
      tracking: "DLVR-123456789"
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "shipped",
      items: [
        {
          id: 2,
          name: "Camel Leather Crafts",
          village: "Khuri",
          price: 1800,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100"
        }
      ],
      total: 4248,
      tracking: "DLVR-987654321"
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "processing",
      items: [
        {
          id: 3,
          name: "Block Printed Textiles",
          village: "Bagru",
          price: 3200,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=100"
        }
      ],
      total: 3776,
      tracking: null
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50'
      case 'shipped':
        return 'text-blue-600 bg-blue-50'
      case 'processing':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered'
      case 'shipped':
        return 'Shipped'
      case 'processing':
        return 'Processing'
      default:
        return 'Unknown'
    }
  }

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus)

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
            <h1 className="text-3xl font-bold text-charcoal mb-2">My Orders</h1>
            <p className="text-gray-600">Track your handicraft purchases and orders</p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="w-5 h-5 text-gray-600" />
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
                All Orders
              </button>
              <button
                onClick={() => setSelectedStatus('processing')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'processing'
                    ? 'bg-saffron text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Processing
              </button>
              <button
                onClick={() => setSelectedStatus('shipped')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'shipped'
                    ? 'bg-saffron text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Shipped
              </button>
              <button
                onClick={() => setSelectedStatus('delivered')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'delivered'
                    ? 'bg-saffron text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Delivered
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-sm p-12 text-center"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">No Orders Found</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Link to="/handicrafts" className="btn-primary">
                Shop Handicrafts
              </Link>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-charcoal">Order #{order.id}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <div className="text-right">
                        <div className="text-lg font-bold text-charcoal">₹{order.total.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Total</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-charcoal">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.village}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-gray-500">Qty: {item.quantity}</span>
                            <span className="text-saffron font-medium">₹{item.price.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/villages/${item.village.toLowerCase()}`}
                            className="p-2 text-gray-600 hover:text-saffron transition-colors"
                            title="View Village"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                      <div className="space-y-2">
                        {order.tracking && (
                          <div className="text-sm">
                            <span className="text-gray-600">Tracking Number: </span>
                            <span className="font-medium text-charcoal">{order.tracking}</span>
                          </div>
                        )}
                        <div className="text-sm text-gray-600">
                          Estimated delivery: {order.status === 'delivered' ? 'Delivered' : '3-5 business days'}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="btn-outline text-sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </button>
                        {order.status === 'shipped' && (
                          <button className="btn-primary text-sm">
                            Track Package
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Empty State for No Orders */}
        {filteredOrders.length === 0 && selectedStatus !== 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm p-12 text-center"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">No {getStatusText(selectedStatus)} Orders</h3>
            <p className="text-gray-600 mb-6">You don't have any {getStatusText(selectedStatus).toLowerCase()} orders.</p>
            <button
              onClick={() => setSelectedStatus('all')}
              className="btn-primary"
            >
              View All Orders
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Orders
