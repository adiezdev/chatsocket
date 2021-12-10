const purge = process.env.NODE_ENV === 'production' ? true : false;
module.exports = {
  purge:{enabled:purge, content: ['./index.html', './src/**/*.{js,ts}']},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {spacing: {
      '13': '3.25rem',
      '15': '3.75rem',
      '128': '33rem',
      '144': '36rem',
    }
},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
