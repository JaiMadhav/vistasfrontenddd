/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#E7A53A',
        terracotta: '#D27A2C',
        'deep-green': '#2E7D32',
        'leaf-green': '#3E8E41',
        'beige-sand': '#F3EAD9',
        charcoal: '#0F1A14',
        'golden-accent': '#FFD27A',
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'source-serif': ['Source Serif 4', 'serif'],
        'mukta': ['Mukta', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-earth': 'linear-gradient(135deg, #F3EAD9 0%, #E7A53A 50%, #D27A2C 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFD27A 0%, #E7A53A 100%)',
        'gradient-nature': 'linear-gradient(135deg, #3E8E41 0%, #2E7D32 100%)',
        'gradient-charcoal': 'linear-gradient(135deg, #0F1A14 0%, #2E7D32 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'warm': '0 8px 32px rgba(231, 165, 58, 0.15)',
        'nature': '0 8px 32px rgba(46, 125, 50, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
    },
  },
  plugins: [],
}
