import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    destinations: [
      { name: 'Rajasthan', path: '/states/rajasthan' },
      { name: 'Gujarat', path: '/states/gujarat' },
      { name: 'Kerala', path: '/states/kerala' },
      { name: 'West Bengal', path: '/states/west-bengal' },
      { name: 'Assam', path: '/states/assam' },
    ],
    experiences: [
      { name: 'Handicrafts', path: '/handicrafts' },
      { name: 'Cultural Packages', path: '/packages' },
      { name: 'Custom Itinerary', path: '/itinerary' },
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQs', path: '/faqs' },
      { name: 'Travel Guide', path: '/guide' },
      { name: 'Terms & Conditions', path: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="/generated-image.png" 
                  alt="Vistas" 
                  className="h-10 w-10 rounded-lg"
                />
                <span className="text-2xl font-pacifico">Vistas</span>
              </div>
              <p className="text-gray-300 mb-6 font-source-serif leading-relaxed max-w-md">
                Discover the authentic beauty of India's hidden villages. Experience traditional culture, 
                handicrafts, and immersive village life across 5 diverse states.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-blue-400" />
                  <span className="font-source-serif">hello@vistas.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-blue-400" />
                  <span className="font-source-serif">+91 93106 39075</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMapPin className="w-5 h-5 text-blue-400" />
                  <span className="font-source-serif">Deoghar, Jharkhand, India</span>
                </div>
              </div>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="text-xl font-semibold mb-6 font-mukta">Destinations</h3>
              <ul className="space-y-3">
                {footerLinks.destinations.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors font-source-serif"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiences */}
            <div>
              <h3 className="text-xl font-semibold mb-6 font-mukta">Experiences</h3>
              <ul className="space-y-3">
                {footerLinks.experiences.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors font-source-serif"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-semibold mb-6 font-mukta">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors font-source-serif"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2 font-mukta">Stay Updated</h3>
              <p className="text-gray-300 font-source-serif">Get the latest travel inspiration and offers</p>
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 font-montserrat"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-montserrat">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 font-montserrat mb-4 md:mb-0">
              © {currentYear} Vistas. All rights reserved.
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
