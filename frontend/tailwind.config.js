// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary-blue': '#0575E6',
          'primary-dark-blue': '#025492',
          'primary-darker-blue': '#022484',
          'text-primary': '#074E85',
          'text-secondary': '#6C757D',
          'text-placeholder': '#A4AAAE',
          'border-color': '#CED4DA',
          primary: {
            DEFAULT: '#025492',
            light: '#509CDB',
          },
          secondary: '#070241',
          darkText: '#282828',
          lightText: '#8A8A8A',
        },
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif'],
          'kumbh': ['Kumbh Sans', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }