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
          50: 'rgb(var(--dark-50) / <alpha-value>)',
          100: 'rgb(var(--dark-100) / <alpha-value>)',
          200: 'rgb(var(--dark-200) / <alpha-value>)',
          300: 'rgb(var(--dark-300) / <alpha-value>)',
          400: 'rgb(var(--dark-400) / <alpha-value>)',
          500: 'rgb(var(--dark-500) / <alpha-value>)',
          600: 'rgb(var(--dark-600) / <alpha-value>)',
          700: 'rgb(var(--dark-700) / <alpha-value>)',
          800: 'rgb(var(--dark-800) / <alpha-value>)',
          900: 'rgb(var(--dark-900) / <alpha-value>)',
          950: 'rgb(var(--dark-950) / <alpha-value>)',
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
