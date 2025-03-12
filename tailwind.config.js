/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 
          DEFAULT: '#387478',
          light: '#4a8f94',
          dark: '#2c5a5e'
        },
        secondary: { 
          DEFAULT: '#2c5282',
          light: '#3b6ba8',
          dark: '#1e3a5c'
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 3s infinite linear'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' }
        }
      }
    }
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.btn': {
          '@apply px-4 py-2 rounded-lg font-medium transition-all duration-300': {},
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed': {}
          },
          '&:focus': {
            '@apply outline-none': {}
          }
        },
        '.btn-primary': {
          '@apply bg-primary text-white': {},
          '&:hover': {
            '@apply bg-primary-dark': {}
          }
        },
        '.btn-outline': {
          '@apply border-2 border-gray-300': {},
          '@apply dark:border-gray-600': {},
          '&:hover': {
            '@apply bg-gray-100': {},
            '@apply dark:bg-gray-700': {}
          }
        }
      })
    }
  ],
}
