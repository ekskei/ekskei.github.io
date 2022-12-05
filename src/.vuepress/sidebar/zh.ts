import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "note",
      prefix: "docs/",
      children: "structure",
      collapsible: true,
    },
    "slides",
    "about",
  ],
});
