import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Global / Achiever / Operational Tiers
        primary: {
          DEFAULT: '#003f7a',
          container: '#1e5799',
          'on-container': '#b0ceff',
          fixed: '#d5e3ff',
          'fixed-dim': '#a6c8ff',
          'on-fixed': '#001c3b',
          'on-fixed-variant': '#004787',
          inverse: '#a6c8ff',
        },
        secondary: {
          DEFAULT: '#006c49',
          container: '#6cf8bb',
          'on-container': '#00714d',
          fixed: '#6ffbbe',
          'fixed-dim': '#4edea3',
          'on-fixed': '#002113',
          'on-fixed-variant': '#005236',
        },
        tertiary: {
          DEFAULT: '#5b3700',
          container: '#7a4c00',
          'on-container': '#ffc174',
          fixed: '#ffddb8',
          'fixed-dim': '#ffb95f',
          'on-fixed': '#2a1700',
          'on-fixed-variant': '#653e00',
        },
        surface: {
          DEFAULT: '#f9f9ff',
          dim: '#d9dae0',
          bright: '#f9f9ff',
          'container-lowest': '#ffffff',
          'container-low': '#f3f3f9',
          container: '#ededf4',
          'container-high': '#e7e8ee',
          'container-highest': '#e2e2e8',
          variant: '#e2e2e8',
          tint: '#295fa1',
        },
        'on-surface': {
          DEFAULT: '#191c20',
          variant: '#424750',
        },
        'inverse-surface': {
          DEFAULT: '#2e3035',
          'on': '#f0f0f6',
        },
        outline: {
          DEFAULT: '#727781',
          variant: '#c2c6d2',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
          'on-container': '#93000a',
        },

        // Explorer Tier Specific Tokens
        explorer: {
          primary: '#2b6c00',
          'primary-container': '#58cc02',
          'primary-dim': '#6be026',
          'on-primary': '#ffffff',
          'on-primary-container': '#1e5000',
          secondary: '#755b00',
          'secondary-container': '#fec700',
          'on-secondary-container': '#6e5400',
          tertiary: '#006590',
          'tertiary-container': '#4abdff',
          'on-tertiary-container': '#004a6b',
          surface: '#fbf9f9',
          'surface-container': '#efeded',
          outline: '#6f7b64',
          'outline-variant': '#becbb1',
        },

        // Scholar Tier Specific Tokens
        scholar: {
          primary: '#131b2e',
          'primary-container': '#131b2e',
          'on-primary-container': '#7c839b',
          secondary: '#505f76',
          'secondary-container': '#d0e1fb',
          'on-secondary-container': '#54647a',
          tertiary: '#479175',
          'tertiary-fixed': '#a6f2d1',
          paper: '#f6fafe',
          slate: '#eaeef2',
          'slate-high': '#e4e9ed',
          'slate-highest': '#dfe3e7',
          outline: '#76777d',
          'outline-variant': '#c6c6cd',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'tactile': '0 4px 0 0 rgba(0,0,0,0.15)',
        'tactile-green': '0 4px 0 0 #1f5100',
        'tactile-yellow': '0 4px 0 0 #6e5400',
        'tactile-blue': '0 4px 0 0 #004a6b',
        'subtle-blue': '0 4px 12px -2px rgba(30, 87, 153, 0.08)',
        'card-blue': '0 12px 24px -4px rgba(30, 87, 153, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
