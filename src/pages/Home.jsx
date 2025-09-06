import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/ui/Hero';
import { states } from '../data/states';
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';

const Home = () => {
  // Prepare data for Infinite Moving Cards
  const movingCardsData = states.map(state => ({
    quote: state.description,
    name: state.name,
    title: `${state.villages?.length || 0} Villages`,
    image: state.image
  }));

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <Hero />

      {/* States Preview with Infinite Moving Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-pacifico text-gray-800 mb-6">
              Explore Our States
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-source-serif">
              Discover the rich cultural heritage and authentic village experiences across India's most beautiful states
            </p>
          </motion.div>
          
          <InfiniteMovingCards
            items={movingCardsData}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="mb-8"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
