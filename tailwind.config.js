/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030306',
          900: '#07070f',
          800: '#0d0d1a',
          700: '#121224',
          600: '#1a1a2e',
        },
        magenta: {
          400: '#f72585',
          500: '#e0007a',
          600: '#b5006a',
        },
        neon: {
          pink: '#ff006e',
          purple: '#8338ec',
          cyan: '#00f5ff',
          yellow: '#ffbe0b',
        },
        chrome: {
          light: '#e8e8f0',
          mid: '#a0a0c0',
          dark: '#606080',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #f72585, 0 0 40px #f72585' },
          '50%': { boxShadow: '0 0 40px #f72585, 0 0 80px #f72585, 0 0 120px #f72585' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 95%, 100%': { opacity: 1 },
          '96%': { opacity: 0.8 },
          '97%': { opacity: 1 },
          '98%': { opacity: 0.6 },
          '99%': { opacity: 1 },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
