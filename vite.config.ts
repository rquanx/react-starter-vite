import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import Path from "./scripts/path";
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    assetsDir: "static",
    sourcemap: true,
  },
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: Path.src,
      },
      {
        find: "@components",
        replacement: path.resolve(Path.src, "components"),
      },
      {
        find: "@services",
        replacement: path.resolve(Path.src, "services"),
      },
      {
        find: "@config",
        replacement: path.resolve(Path.src, "config"),
      },
      {
        find: "@assets",
        replacement: path.resolve(Path.src, "assets"),
      },
    ],
  },
  css: {
    postcss: {
      plugins: [
        require("postcss-import"),
        require("precss"), // 让css支持类似sass的语法,vscode在设置json中增加 "files.associations": { "*.css": "scss" }
        require("autoprefixer"),
      ],
    },
  },
});
