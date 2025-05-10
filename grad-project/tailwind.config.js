/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./input.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        vibrate: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(0px, 10px)' },
          '75%': { transform: 'translate(0px, 5px)' },
          '100%': { transform: 'translate(0, 0)' },
        }
      },
      animation: {
        vibrate: 'vibrate 1.5s linear infinite',
      }
    },
  },
  plugins: [],
}

