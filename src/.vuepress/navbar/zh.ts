import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "更多",
    icon: "info",
    prefix: "/",
    children: [
      { text: "幻灯片", icon: "slides", link: "slides" },
      { text: "关于", icon: "info", link: "about" },
    ],
  }
]);
