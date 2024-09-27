/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url(/assets/bg.png)",
      },
      colors: {
        "#8A33FD": "#8A33FD",
        "#8A8989": "#8A8989",
        "#807D7E": "#807D7E",
        "#F6F6F6": "#F6F6F6",
        "#2A2F2F": "#2A2F2F",
        "#333333": "#333333",
        "#BEBCBD": "#BEBCBD",
        "#EDEEF2": "#EDEEF2",
        "#3C4242": "#3C4242",
        "#6620C1": "#6620C1",
        "#EAEAEA": "#EAEAEA",
      },
    },
  },
  plugins: [],
};
