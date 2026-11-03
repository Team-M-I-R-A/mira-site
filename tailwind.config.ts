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
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)', WebkitTransform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)', WebkitTransform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)', WebkitTransform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)', WebkitTransform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 40px rgba(6, 23, 43))',
        'glow-lg': '0 0 80px rgba(6, 23, 43))',
        'card': '0 4px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config
