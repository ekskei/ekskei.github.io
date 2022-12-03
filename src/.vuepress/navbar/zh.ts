import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "文章",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "技术分享",
        icon: "note",
        prefix: "",
        children: [
          { text: "安装Node.js和npm", icon: "edit", link: "安装Node.js和npm" },
          { text: "SQLite3性能优化", icon: "edit", link: "SQLite3性能优化" },
        ],
      }
    ],
  },
  {text: "关于", icon: "info", link: "/intro"}
]);
