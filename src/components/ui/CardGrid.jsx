import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiUsers, FiStar } from 'react-icons/fi';
import { cn } from '../../utils/cn';
import GlowingEffect from './GlowingEffect';

const CardGrid = ({ 
  items, 
  title, 
  subtitle, 
  type = 'states', 
  className = "",
  columns = 3 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderCard = (item, index) => {
    if (type === 'states') {
      return (
        <motion.div
          key={item.id}
          variants={cardVariants}
          className="group"
        >
          <GlowingEffect variant="default" disabled={false}>
            <Link to={`/states/${item.id}`}>
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-montserrat font-semibold text-gray-800">
                        {item.villages?.length || 0} Villages
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-pacifico text-gray-800 mb-3">{item.name}</h3>
                  <p className="text-gray-600 mb-4 font-montserrat leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.highlights?.slice(0, 2).map((highlight) => (
                      <span key={highlight} className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm font-montserrat">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FiMapPin className="w-4 h-4" />
                      <span className="font-montserrat">{item.villages?.length || 0} Villages</span>
                    </div>
                    <FiArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </GlowingEffect>
        </motion.div>
      );
    }

    if (type === 'villages') {
      return (
        <motion.div
          key={item.id}
          variants={cardVariants}
          className="group"
        >
          <GlowingEffect variant="default" disabled={false}>
            <Link to={`/villages/${item.id}`}>
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-montserrat font-semibold text-gray-800">
                        {item.state}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-pacifico text-gray-800 mb-3">{item.name}</h3>
                  <p className="text-gray-600 mb-4 font-montserrat leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <FiMapPin className="w-4 h-4" />
                    <span className="font-montserrat">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FiStar className="w-4 h-4 text-yellow-400" />
                      <span className="font-montserrat">{item.event?.name}</span>
                    </div>
                    <FiArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </GlowingEffect>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-6">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "grid gap-8",
            columns === 1 && "grid-cols-1",
            columns === 2 && "grid-cols-1 md:grid-cols-2",
            columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {items.map((item, index) => renderCard(item, index))}
        </motion.div>
      </div>
    </section>
  );
};

export default CardGrid;
