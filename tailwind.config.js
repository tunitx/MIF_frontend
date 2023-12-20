/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header_bg: "url('./assests/images/header_bg.webp')",
        ca_vijayGarg: "url('./assests/images/CA_Vijay.webp')",
        globe_study: "url('./assests/images/globel_study_abroad.webp')",
        matrimony: "url('./assests/images/MIF Martimony.webp')",
      },
      fontFamily: {
        PlayFair: ["Playfair Display", "sans-serif"],
        Poppins: ["Poppins ", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
        "default-bold-body": "SF Pro Text",
        "description-of-gotra": "Outfit",
        "josefin-sans": "'Josefin Sans'",
      },
      boxShadow: {
        box_shadow_marwadi: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        box_shadow_marwadi_LOM: "-2px 3px 3px 2px rgba(239,77,72,0.7)",
        ca_vijay_shadow:
          "0px 0px 10px 0px rgba(236.49375915527347, 234.95140855208692, 234.95140855208692, 0.93)",
      },
      opacity: {
        15: ".15",
      },
      colors: {
        seashell: "#fff5f0",
        gainsboro: "#d9d9d9",
        moccasin: "#ffe8b5",
        orangered: "#ff5500",
        matrimony_orange: "#ffa400",
        // black: "#000",
        matrimony_text_gray: "#1e1e1e",
        tomato: "#f05a29",
        blanchedalmond: "#ffe8ca",
        brown: "#912c31",
        darkslategray: "#2d2d2d",
        rosybrown: "#ca8a84",
      },
    },
  },
  plugins: [require("autoprefixer")],
};
