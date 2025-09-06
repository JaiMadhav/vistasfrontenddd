import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { states } from '../data/states';
import { FocusCards } from '../components/ui/focus-cards';

const States = () => {
  const navigate = useNavigate();

  const handleExploreClick = (stateId) => {
    // Scroll to top immediately before navigation
    window.scrollTo(0, 0);
    navigate(`/states/${stateId}`);
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-cover bg-center bg-no-repeat min-h-[50vh] pt-32 md:pt-40" style={{backgroundImage: 'url(/Images/landscape-bg.jpg)'}}>
        {/* Fallback background color in case image doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center min-h-[50vh]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-pacifico text-white mb-8 drop-shadow-lg"
          >
            Explore Our States
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-source-serif drop-shadow-md leading-relaxed"
          >
            Discover the rich cultural heritage and authentic village experiences across 5 diverse states of India
          </motion.p>
        </div>
      </section>

      {/* States Focus Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
              <img
                src="/Images/landscape-bg.jpg"
                alt="Beautiful Indian landscape"
                className="w-full h-[300px] md:h-[400px] object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
                <h2 className="text-4xl md:text-5xl font-pacifico text-white mb-4 drop-shadow-lg">
                  Discover Our States
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto font-source-serif drop-shadow-md">
                  Hover over any state to focus on it and explore its unique culture
                </p>
              </div>
            </div>
          </motion.div>
          
          <FocusCards
            cards={states.map((state) => ({
              src: state.image,
              title: state.name,
              villagesCount: state.villages.length,
              stateId: state.id,
              culture: state.highlights[0] || "Rich Heritage",
              description: state.description
            }))}
            onExploreClick={handleExploreClick}
          />
        </div>
      </section>

    </div>
  );
};

export default States;
