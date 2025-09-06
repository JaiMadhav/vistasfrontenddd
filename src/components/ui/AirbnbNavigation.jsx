import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiUser } from 'react-icons/fi';

const AirbnbNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Effect to handle scroll event - trigger at 30px with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 30;
          setScrolled(isScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: "States", link: "/states" },
    { name: "Villages", link: "/villages" },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
      scrolled
        ? 'bg-white/50 backdrop-blur-[10px] border-b border-gray-200/30'
        : 'bg-transparent border-b border-transparent'
    }`}>
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
            <span className={`text-xl font-pacifico transition-colors duration-200 ${
              scrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
            }`}>Vistas</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`text-base font-mukta transition-colors duration-200 ${
                  location.pathname === item.link
                    ? scrolled 
                      ? 'text-blue-600 font-semibold'
                      : 'text-blue-300 font-semibold drop-shadow-lg'
                    : scrolled
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-white hover:text-blue-300 drop-shadow-lg'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors duration-200 ${
                  scrolled
                    ? 'border border-gray-300 hover:shadow-md'
                    : 'border border-white/30 hover:bg-white/10'
                }`}
              >
                <FiMenu className={`w-4 h-4 transition-colors duration-200 ${
                  scrolled ? 'text-gray-700' : 'text-white drop-shadow-lg'
                }`} />
                <FiUser className={`w-4 h-4 transition-colors duration-200 ${
                  scrolled ? 'text-gray-700' : 'text-white drop-shadow-lg'
                }`} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white/95 rounded-lg shadow-lg border border-gray-200 py-2 z-50 scrollbar-hide"
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
              className={`lg:hidden p-2 rounded-full transition-colors duration-200 ${
                scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              }`}
            >
              <FiMenu className={`w-5 h-5 transition-colors duration-200 ${
                scrolled ? 'text-gray-700' : 'text-white drop-shadow-lg'
              }`} />
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
              className={`lg:hidden py-4 transition-colors duration-200 scrollbar-hide ${
                scrolled
                  ? 'bg-white/95 border-t border-gray-200'
                  : 'bg-black/20 border-t border-white/20'
              }`}
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
                          ? scrolled
                            ? 'text-blue-600 font-semibold'
                            : 'text-blue-300 font-semibold drop-shadow-lg'
                          : scrolled
                            ? 'text-gray-700 hover:text-blue-600'
                            : 'text-white hover:text-blue-300 drop-shadow-lg'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile User Actions */}
                <div className={`px-4 pt-4 space-y-2 transition-colors duration-200 ${
                  scrolled ? 'border-t border-gray-200' : 'border-t border-white/20'
                }`}>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.link}
                      className={`block py-2 text-lg font-mukta transition-colors duration-200 ${
                        scrolled
                          ? 'text-gray-700 hover:text-blue-600'
                          : 'text-white hover:text-blue-300 drop-shadow-lg'
                      }`}
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
