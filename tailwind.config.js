/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-2': '#111111',
        'bg-3': '#181818',
        surface: '#1e1e1e',
        accent: '#e8c547',
        't1': '#f5f5f5',
        't2': '#a0a0a0',
        't3': '#555555',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
