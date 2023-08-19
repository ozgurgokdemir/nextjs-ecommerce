const { fontFamily, screens } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const { '2xl': _, ...containerScreens } = screens;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        'label-lg-500': ['1.125rem', { lineHeight: '1.25', fontWeight: '500' }],
        'label-lg-600': ['1.125rem', { lineHeight: '1.25', fontWeight: '600' }],
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
      boxShadow: {
        stroke: `inset 0 0 0 1px ${colors.slate[100]}`,
        'stroke-t': `inset 0 1px 0 0 ${colors.slate[100]}`,
        'stroke-r': `inset -1px 0 0 0 ${colors.slate[100]}`,
        'stroke-b': `inset 0 -1px 0 0 ${colors.slate[100]}`,
        'stroke-l': `inset 1px 0 0 0 ${colors.slate[100]}`,
        'stroke-2': `inset 0 0 0 2px ${colors.slate[100]}`,
        'stroke-t-2': `inset 0 2px 0 0 ${colors.slate[100]}`,
        'stroke-r-2': `inset -2px 0 0 0 ${colors.slate[100]}`,
        'stroke-b-2': `inset 0 -2px 0 0 ${colors.slate[100]}`,
        'stroke-l-2': `inset 2px 0 0 0 ${colors.slate[100]}`,
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: containerScreens,
      },
      animation: {
        'subtle-ping': 'subtle-ping 5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'subtle-ping': {
          '20%, 100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addVariant, matchUtilities, theme }) => {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
      matchUtilities(
        {
          'block-start': (value) => ({ insetBlockStart: value }),
          'block-end': (value) => ({ insetBlockEnd: value }),
        },
        {
          supportsNegativeValues: true,
          values: theme('inset'),
        }
      );
    }),
  ],
};
