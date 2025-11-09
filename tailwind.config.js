/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-200',
    'bg-purple-300',
    'bg-orange-300',
    'bg-gray-400',
    'bg-pink-300',
    'bg-teal-200',
    'bg-indigo-300',
  ],
};
