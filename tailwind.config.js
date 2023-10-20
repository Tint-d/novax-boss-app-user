/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warining: "#DCA715",
        success: "#00FF47",
        danger: "#FF0000",
        textColor: "#676767",
        hightlightColor: "#212121",
        rowColor: "#1B1B1B",
        tableBgColor: "#171717",
      },
      fontSize: {
        paragraph: "15px",
        subTitle: "20px",
        title: "25px",
      },
      fontFamily: {
        engFont: ["Roboto", "sans-serif"],
        myanmarFont: ["Padauk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
