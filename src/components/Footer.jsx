import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'States', path: '/states' },
    { name: 'Handicrafts', path: '/handicrafts' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  const services = [
    'Village Tours',
    'Cultural Experiences',
    'Handicraft Shopping',
    'Custom Packages',
    'AI Itinerary Planning',
    'Local Guides'
  ]

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiYoutube, href: '#', label: 'YouTube' }
  ]

  return (
    <footer className="bg-charcoal text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-saffron to-terracotta rounded-lg flex items-center justify-center">
                <span className="text-white font-poppins font-bold text-lg">V</span>
              </div>
              <span className="text-2xl font-poppins font-bold text-white">VISTAS</span>
            </div>
            <p className="text-gray-300 mb-4 font-inter">
              Discover India's hidden villages and authentic cultural experiences. 
              From traditional handicrafts to immersive village tours.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-300">
                <FiPhone className="w-4 h-4 text-saffron" />
                <span className="font-inter">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMail className="w-4 h-4 text-saffron" />
                <span className="font-inter">hello@vistas.in</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMapPin className="w-4 h-4 text-saffron" />
                <span className="font-inter">Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4 text-saffron">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-saffron transition-colors duration-200 font-inter"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4 text-saffron">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 font-inter">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4 text-saffron">Newsletter</h3>
            <p className="text-gray-300 mb-4 font-inter">
              Subscribe to get updates about new villages, events, and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-saffron focus:outline-none transition-colors font-inter"
              />
              <button
                type="submit"
                className="w-full btn-primary"
              >
                Subscribe
              </button>
            </form>
            
            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-poppins font-semibold mb-3 text-saffron">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-saffron hover:bg-gray-700 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 font-inter text-sm">
              © 2024 Vistas. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-saffron transition-colors text-sm font-inter">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-saffron transition-colors text-sm font-inter">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
