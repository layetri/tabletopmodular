const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        palePurple: "#f1e3f3",
        lavenderBlue: "#c2bbf0",
        mountbattenPink: "#987284",
        rhythm: "#847996",
        cadetGrey: "#8796a1",
        verdigris: "#75b9be",
        frenchSkyBlue: "#8fb8ed",
        dodgerBlue: "#3590f3",
        mayaBlue: "#62bfed",
        blizzardBlue: "#c4f5fc",
        magicMint: "#b7ffd8",
        cambridgeBlue: "#a3c8ba",
        paleSpringBud: "#d0d6b5",
        mistyRose: "#ffd9ce",
        apricot: "#ffd6ba",
        lightOrange: "#ffd6af",
        melon: "#f9b5ac",
        congoPink: "#f49690",
        lightCoral: "#ee7674",
        darkCoral: "#e36275",
        flame: "#eb6534"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
