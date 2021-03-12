module.exports = {
  // purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    minWidth: {
      almostmax: "10%",
    },
    maxWidth: {
      almostmax: "10%",
    },
    width: {
      table: "4.5%",
      tablescore: "2%",
      tablewinloss: "4.5%",
      tablenotes: "75%",
      vidControlsInput: "210px",
      vidControls: "65px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
