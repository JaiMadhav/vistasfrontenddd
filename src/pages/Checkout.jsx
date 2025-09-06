import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const Checkout = () => {
  const [activeTab, setActiveTab] = useState('cart')
  const [paymentMethod, setPaymentMethod] = useState('card')

  // Sample cart data - in a real app, this would come from context/state
  const cartItems = [
    {
      id: 1,
      type: 'handicraft',
      name: 'Handwoven Dhurrie',
      village: 'Bishnoi',
      price: 2500,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=100'
    },
    {
      id: 2,
      type: 'package',
      name: 'Khuri Desert Adventure',
      village: 'Khuri',
      price: 4500,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100'
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.18 // 18% GST
  const shipping = 200
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-beige-sand">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-charcoal">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Shopping</span>
            </Link>
            <div className="flex-1"></div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-deep-green" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('cart')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'cart'
                      ? 'text-saffron border-b-2 border-saffron'
                      : 'text-gray-600 hover:text-charcoal'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 inline mr-2" />
                  Cart Items
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'shipping'
                      ? 'text-saffron border-b-2 border-saffron'
                      : 'text-gray-600 hover:text-charcoal'
                  }`}
                >
                  <Truck className="w-5 h-5 inline mr-2" />
                  Shipping
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'payment'
                      ? 'text-saffron border-b-2 border-saffron'
                      : 'text-gray-600 hover:text-charcoal'
                  }`}
                >
                  <CreditCard className="w-5 h-5 inline mr-2" />
                  Payment
                </button>
              </div>
            </div>

            {/* Cart Items */}
            {activeTab === 'cart' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold text-charcoal mb-6">Your Cart</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-charcoal">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.village}</p>
                        <span className="text-xs bg-saffron/10 text-saffron px-2 py-1 rounded">
                          {item.type === 'handicraft' ? 'Handicraft' : 'Package'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-charcoal">₹{item.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className="btn-primary"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </motion.div>
            )}

            {/* Shipping Form */}
            {activeTab === 'shipping' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold text-charcoal mb-6">Shipping Information</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Address *
                    </label>
                    <textarea
                      rows={3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        State *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        <option value="rajasthan">Rajasthan</option>
                        <option value="gujarat">Gujarat</option>
                        <option value="kerala">Kerala</option>
                        <option value="west-bengal">West Bengal</option>
                        <option value="assam">Assam</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('cart')}
                      className="btn-outline"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('payment')}
                      className="btn-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Payment Form */}
            {activeTab === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold text-charcoal mb-6">Payment Method</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-saffron focus:ring-saffron"
                      />
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                    
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-saffron focus:ring-saffron"
                      />
                      <span className="font-medium">UPI</span>
                    </label>
                    
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-saffron focus:ring-saffron"
                      />
                      <span className="font-medium">Net Banking</span>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('shipping')}
                      className="btn-outline"
                    >
                      Back to Shipping
                    </button>
                    <button className="btn-primary">
                      Pay ₹{total.toLocaleString()}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-charcoal mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-charcoal">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.village}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-charcoal">₹{item.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-charcoal border-t pt-3">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
