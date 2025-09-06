import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'States', path: '/states' },
    { name: 'Villages', path: '/villages' },
    { name: 'Handicrafts', path: '/handicrafts' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      className={
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300
         bg-transparent backdrop-blur-0 shadow-none`
      }
    >
      <div className="container-custom px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/generated-image.png" alt="Vistas Logo" className="w-12 h-12" />
            {/* keep your gradient class if you have it, otherwise make it white */}
            <span className="text-2xl font-pacifico text-white hero-gradient-text">
              Vistas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-200 nav-text
                    ${active ? 'text-orange-400' : 'text-white hover:text-orange-400'}`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/orders"
              className="relative p-2 text-white hover:text-orange-400 transition-colors"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              to="/bookings"
              className="p-2 text-white hover:text-orange-400 transition-colors"
            >
              <FiUser className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-orange-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="container-custom px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const active = location.pathname === link.path
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={closeMenu}
                      className={`nav-text py-2 transition-colors duration-200
                        ${active ? 'text-orange-500' : 'text-charcoal hover:text-orange-500'}`}
                    >
                      {link.name}
                    </Link>
                  )
                })}

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <Link
                    to="/orders"
                    onClick={closeMenu}
                    className="flex items-center space-x-2 text-charcoal hover:text-orange-500 transition-colors nav-text"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Cart (0)</span>
                  </Link>
                  <Link
                    to="/bookings"
                    onClick={closeMenu}
                    className="flex items-center space-x-2 text-charcoal hover:text-orange-500 transition-colors nav-text"
                  >
                    <FiUser className="w-5 h-5" />
                    <span>Bookings</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar