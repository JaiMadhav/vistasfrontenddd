import { motion } from 'framer-motion'
import { Users, MapPin, Heart, Award, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  const stats = [
    { icon: Users, number: "5000+", label: "Happy Travelers" },
    { icon: MapPin, number: "25", label: "Villages" },
    { icon: Heart, number: "100%", label: "Authentic Experience" }
  ]

  const values = [
    {
      icon: "🤝",
      title: "Community First",
      description: "We prioritize the well-being and prosperity of local communities"
    },
    {
      icon: "🌱",
      title: "Sustainable Tourism",
      description: "Promoting responsible travel that preserves cultural heritage"
    },
    {
      icon: "🎭",
      title: "Cultural Preservation",
      description: "Supporting traditional crafts and cultural practices"
    },
    {
      icon: "✨",
      title: "Authentic Experiences",
      description: "Connecting travelers with genuine local life and traditions"
    }
  ]

  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
      bio: "Passionate about sustainable tourism and cultural preservation"
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      bio: "Expert in village tourism and community development"
    },
    {
      name: "Meera Patel",
      role: "Cultural Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      bio: "Dedicated to preserving traditional crafts and cultural heritage"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-saffron via-terracotta to-deep-green">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 container-custom h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl font-bold mb-4">About Vistas</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Connecting travelers with authentic village experiences and preserving India's rich cultural heritage
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-charcoal mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Vistas was born from a deep passion for authentic travel experiences and a commitment to preserving India's rich cultural heritage. Our journey began in 2020 when we discovered the hidden gems of rural India - villages that held centuries-old traditions, crafts, and ways of life.
                </p>
                <p>
                  We realized that these communities had incredible stories to share, traditional crafts to showcase, and authentic experiences to offer. However, they lacked the platform and support to connect with travelers who were seeking genuine cultural immersion.
                </p>
                <p>
                  Today, Vistas serves as a bridge between curious travelers and local communities, creating meaningful connections that benefit both parties while preserving the cultural heritage that makes each village unique.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600"
                alt="Village life"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-saffron" />
                  <span className="font-semibold text-charcoal">Best Village Tourism 2023</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-beige-sand">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Numbers that tell the story of our commitment to authentic village tourism
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-saffron to-terracotta rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-charcoal mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Vistas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card card-hover p-6 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Making a difference in communities across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Artisans Supported", icon: "👨‍🎨", color: "from-blue-400 to-cyan-400" },
              { number: "25", label: "Villages Connected", icon: "🏘️", color: "from-green-400 to-emerald-400" },
              { number: "10,000+", label: "Travelers Served", icon: "👥", color: "from-purple-400 to-pink-400" },
              { number: "₹50L+", label: "Revenue Generated", icon: "💰", color: "from-orange-400 to-red-400" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-charcoal mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
                alt="Village crafts"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-deep-green" />
                  <span className="font-semibold text-charcoal">25 Villages</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-charcoal mb-6">Our Mission</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  To create meaningful connections between travelers and local communities while preserving India's rich cultural heritage through authentic village experiences.
                </p>
                <p>
                  We believe that sustainable tourism can be a powerful force for good - supporting local economies, preserving traditional crafts, and fostering cross-cultural understanding.
                </p>
                <p>
                  Every village we work with has been carefully selected for its unique cultural offerings, commitment to sustainable practices, and genuine hospitality.
                </p>
              </div>
              
              <div className="mt-8">
                <Link to="/villages" className="btn-primary">
                  Explore Villages
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-deep-green to-leaf-green">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Us in Preserving Cultural Heritage
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Experience authentic village life and support local communities while creating unforgettable memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages" className="btn-secondary">
                View Packages
              </Link>
              <Link to="/contact" className="btn-outline text-white border-white hover:bg-white hover:text-deep-green">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
