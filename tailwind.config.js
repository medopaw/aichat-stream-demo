/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#b9ddfc',
          300: '#7cc2fa',
          400: '#36a5f5',
          500: '#1677FF', // DeepSeek-inspired blue
          600: '#0359db',
          700: '#0349ba',
          800: '#093c8f',
          900: '#0e3375',
        },
        accent: {
          50: '#eefbf7',
          100: '#d6f5ec',
          200: '#b0ead9',
          300: '#69d5ba',
          400: '#2cbc97',
          500: '#0BA37F', // DeepSeek-inspired teal/green
          600: '#028064',
          700: '#026a53',
          800: '#035444',
          900: '#034539',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            code: {
              backgroundColor: '#f1f5f9',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};