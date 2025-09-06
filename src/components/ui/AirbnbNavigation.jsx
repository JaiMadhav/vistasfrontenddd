import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiUser, FiShoppingCart } from 'react-icons/fi';

const AirbnbNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const navItems = [
    { name: "States", link: "/states" },
    { name: "Handicrafts", link: "/handicrafts" },
    { name: "Packages", link: "/packages" },
  ];

  const userMenuItems = [
    { name: "Sign In", link: "/signin" },
    { name: "Sign Up", link: "/signup" },
    { name: "Orders", link: "/orders" },
    { name: "Bookings", link: "/bookings" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-[10px] border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img 
                src="/generated-image.png" 
                alt="Vistas Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-pacifico text-gray-800">Vistas</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`text-base font-mukta transition-colors duration-200 ${
                  location.pathname === item.link
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">

            {/* Cart Button */}
            <Link
              to="/checkout"
              className="relative flex items-center space-x-2 px-3 py-2 rounded-full border border-gray-300 hover:shadow-md transition-colors duration-200"
            >
              <FiShoppingCart className="w-4 h-4 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-full border border-gray-300 hover:shadow-md transition-colors duration-200"
              >
                <FiMenu className="w-4 h-4 text-gray-700" />
                <FiUser className="w-4 h-4 text-gray-700" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white/95 rounded-lg shadow-lg border border-gray-200 py-2 z-50 scrollbar-hide overflow-hidden"
                  >
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.link}
                        className="block px-4 py-2 text-base font-mukta text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <FiMenu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 bg-white/95 border-t border-gray-200 scrollbar-hide overflow-hidden"
            >
              <div className="space-y-4">
                {/* Mobile Navigation Links */}
                <div className="px-4 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.link}
                      className={`block py-2 text-lg font-mukta transition-colors duration-200 ${
                        location.pathname === item.link
                          ? 'text-blue-600 font-semibold'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile User Actions */}
                <div className="px-4 pt-4 space-y-2 border-t border-gray-200">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.link}
                      className="block py-2 text-lg font-mukta text-gray-700 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default AirbnbNavigation;