/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#c7dcfe',
          300: '#a3c4fd',
          400: '#75a2fa',
          500: '#467af6',
          600: '#2654eb',
          700: '#1b3ec7',
          800: '#1a33a0',
          900: '#0f2744', // Dark navy
          950: '#0a192f', // Deep dark navy (biru dongker)
        },
        primary: {
          DEFAULT: '#0f2744',
          hover: '#0a192f',
          light: '#eef4ff',
        },
        accent: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          light: '#eff6ff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 39, 68, 0.06)',
        'card': '0 10px 30px -4px rgba(15, 39, 68, 0.08)',
        'hover': '0 20px 35px -5px rgba(15, 39, 68, 0.12)',
        'navy': '0 10px 30px -5px rgba(10, 25, 47, 0.3)',
      }
    },
  },
  plugins: [],
}
