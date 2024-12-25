/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dallas: {
          blue: '#041E42',
          silver: '#869397',
          gold: '#B0976D',
          cream: '#F5F2ED',
          navy: '#13294B'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'lora': ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}