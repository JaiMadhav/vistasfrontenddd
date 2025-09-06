import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiMapPin, FiUsers, FiShoppingBag, FiPackage, FiCalendar, FiUser, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { cn } from '../../utils/cn';

const FloatingDock = () => {
  const location = useLocation();


  const navItems = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: 'States', path: '/states', icon: FiMapPin },
    { name: 'Handicrafts', path: '/handicrafts', icon: FiShoppingBag },
    { name: 'Packages', path: '/packages', icon: FiPackage },
    { name: 'Itinerary', path: '/itinerary', icon: FiCalendar },
  ];

  const actionItems = [
    { name: 'Account', icon: FiUser, onClick: () => console.log('Account clicked') },
    { name: 'Cart', icon: FiShoppingCart, onClick: () => console.log('Cart clicked') },
    { name: 'Wishlist', icon: FiHeart, onClick: () => console.log('Wishlist clicked') },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
          <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl px-4 py-3">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <div className="flex items-center space-x-2 mr-4">
                <img 
                  src="/generated-image.png" 
                  alt="Vistas" 
                  className="h-8 w-8 rounded-lg"
                />
                <span className="text-lg font-pacifico text-gray-800 hidden sm:block">Vistas</span>
              </div>

              {/* Navigation Items */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        "relative p-3 rounded-xl transition-all duration-200",
                        isActive(item.path)
                          ? "bg-blue-500 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                      )}
                      title={item.name}
                    >
                      <item.icon className="w-5 h-5" />
                      {isActive(item.path) && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                          layoutId="activeIndicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-300 mx-2" />

              {/* Action Items */}
              <div className="flex items-center space-x-1">
                {actionItems.map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={item.onClick}
                    className="p-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
                    title={item.name}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
    </motion.div>
  );
};

export default FloatingDock;
