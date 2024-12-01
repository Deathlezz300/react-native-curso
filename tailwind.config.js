/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      fontFamily:{
        'works-black':['WorkSans-Black', 'sans-serif'],
        'works-light':['WorkSans-Light', 'sans-serif'],
        'works-medium':['WorkSans-Medium', 'sans-serif'],
      },

      colors:{
        primary:'#49129C',
        secondary:{
          DEFAULT:'#B40086',
          100:'#C51297',
          200:'#831266'
        },
        tertiary: '#EF2967'
      }

    },
  },
  plugins: [],
};
