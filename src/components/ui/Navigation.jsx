import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiUser, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { cn } from '../../utils/cn';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();


  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'States', path: '/states' },
    { name: 'Handicrafts', path: '/handicrafts' },
    { name: 'Packages', path: '/packages' },
    { name: 'Itinerary', path: '/itinerary' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/generated-image.png" 
              alt="Vistas" 
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-xl font-pacifico text-gray-800">Vistas</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FiHeart className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FiShoppingCart className="w-5 h-5" />
            </button>
            <Link
              to="/signin"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium transition-colors duration-200",
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50 rounded-lg"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                  <FiHeart className="w-5 h-5 mr-3" />
                  Wishlist
                </button>
                <button className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                  <FiShoppingCart className="w-5 h-5 mr-3" />
                  Cart
                </button>
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                >
                  <FiUser className="w-5 h-5 mr-3" />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center w-full px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
