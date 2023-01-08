import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "更多",
    icon: "info",
    prefix: "/",
    children: [
      { text: "文章", icon: "note", link: "docs" },
      { text: "关于", icon: "info", link: "about" },
    ],
  }
]);
