import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        dark: {
          50: '#f8f7f4',
          100: '#f0ede6',
          200: '#e2ddd3',
          300: '#ccc4b5',
          400: '#b3a896',
          500: '#9a8d7a',
          600: '#7d7065',
          700: '#5f554c',
          800: '#3d3630',
          900: '#1e1a16',
          950: '#0d0b08',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'slide-in-left': 'slideInLeft 0.8s ease forwards',
        'slide-in-right': 'slideInRight 0.8s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)', WebkitTransform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)', WebkitTransform: 'translateY(-20px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)', WebkitTransform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)', WebkitTransform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-60px)', WebkitTransform: 'translateX(-60px)' },
          to: { opacity: '1', transform: 'translateX(0)', WebkitTransform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(60px)', WebkitTransform: 'translateX(60px)' },
          to: { opacity: '1', transform: 'translateX(0)', WebkitTransform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rotateSlow: {
          from: { transform: 'rotate(0deg)', WebkitTransform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)', WebkitTransform: 'rotate(360deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)', WebkitTransform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)', WebkitTransform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)', WebkitTransform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)', WebkitTransform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(6, 23, 43))',
        'glow-lg': '0 0 80px rgba(6, 23, 43))',
        'glow-gold': '0 0 40px rgba(6, 23, 43))',
        'card': '0 4px 40px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.2)',
        'inner-glow': 'inset 0 0 30px rgba(249, 115, 22, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
