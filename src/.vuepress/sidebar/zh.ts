import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "note",
      prefix: "articles/",
      children: "structure",
    },
    "slides",
    "about",
  ],
});
