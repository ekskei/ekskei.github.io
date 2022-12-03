import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "CODEVK",
      description: "Code wiki",
    },
    "/en/": {
      lang: "en-US",
      title: "CODEVK",
      description: "Code wiki",
    },
  },

  theme,

  shouldPrefetch: false,

  plugins: [
  ],
});
