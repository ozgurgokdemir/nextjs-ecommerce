const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-inter)', ...fontFamily.sans],
        secondary: ['var(--font-poppins)', ...fontFamily.sans],
      },
      fontSize: {
        'body-xs-400': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs-500': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body-sm-400': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm-500': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body-base-400': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-base-500': ['1rem', { lineHeight: '1.5', fontWeight: '500' }],
        'label-sm-500': ['0.875rem', { lineHeight: '1.25', fontWeight: '500' }],
        'label-sm-600': ['0.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'label-base-500': ['1rem', { lineHeight: '1.25', fontWeight: '500' }],
        'label-base-600': ['1rem', { lineHeight: '1.25', fontWeight: '600' }],
        'label-xl-500': ['1.25rem', { lineHeight: '1.25', fontWeight: '500' }],
        'label-xl-600': ['1.25rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-2xl': ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-3xl': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-4xl': ['2.25rem', { lineHeight: '1.25', fontWeight: '600' }],
        display: ['2.5rem', { lineHeight: '1.25', fontWeight: '600' }],
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
};
