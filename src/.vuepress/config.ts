import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { sitemapPlugin } from 'vuepress-plugin-sitemap2';

export default defineUserConfig({
  base: "/",

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
    searchProPlugin({
    }),
    googleAnalyticsPlugin({
      id: 'G-1E8QEYT4W6',
    }),
    sitemapPlugin({
      hostname: 'https://codevk.com'
    }),
  ],
});
