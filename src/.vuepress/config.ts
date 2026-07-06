import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";

export default defineUserConfig({
  base: "/",
  bundler: viteBundler(),

  locales: {
    "/": {
      lang: "zh-CN",
      title: "CODEVK",
      description: "code wiki",
    },
  },

  theme,

  shouldPrefetch: false,

  plugins: [
    googleAnalyticsPlugin({
      id: "G-1E8QEYT4W6",
    }),
  ],
});
