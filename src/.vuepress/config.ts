import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "CODEVK",
      description: "code wiki",
    },
    "/en/": {
      lang: "en-US",
      title: "CODEVK",
      description: "code wiki",
    },
  },

  theme,

  shouldPrefetch: false,

  plugins: [
    searchProPlugin({
    }),
  ],
});
