module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        pedal: '5px 5px 25px -5px #000000',
      },
      colors: {
        text: '#ffffff',
        main: '#ff4b00',
        alternate: '#ab7d59',
        secondary: '#a1a29e',
        third: '#90918e',
        grey: 'rgba(0, 0, 0, 0.4)',
        dark: 'rgba(0, 0, 0, 0.6)',
        darker: 'rgba(0, 0, 0, 0.8)',
        darkest: 'rgba(0, 0, 0, 0.9)',
        palest: '#ffffff',
        datePicker: {
          one: '#999',
          two: '#777',
          three: '#555',
          four: '#333',
          five: '#111',
        },
      },
      fontFamily: {
        sans: ['Gidole'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' })],
}
