import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "C/C++", icon: "note", link: "/docs/cpp笔记/" },
  { text: "Git", icon: "note", link: "/docs/Git笔记/"},
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
