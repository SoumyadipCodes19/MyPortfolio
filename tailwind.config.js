/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#050510',
          secondary: '#0a0a1f',
          card: 'rgba(255,255,255,0.04)',
        },
        cyan: {
          neon: '#00F5FF',
          dim: '#00C4CC',
          glow: 'rgba(0,245,255,0.15)',
        },
        violet: {
          neon: '#7B2FFF',
          dim: '#6025CC',
          glow: 'rgba(123,47,255,0.15)',
        },
        emerald: {
          neon: '#00FF88',
          dim: '#00CC6A',
          glow: 'rgba(0,255,136,0.15)',
        },
        text: {
          primary: '#F0F4FF',
          secondary: '#8892B0',
          muted: '#4A5568',
        },
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'spin-slow': 'spin 20s linear infinite',
        'draw-line': 'drawLine 1.5s ease forwards',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'scale-in': 'scaleIn 0.5s ease forwards',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        drawLine: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}