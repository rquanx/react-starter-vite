const path = require("path");
const root = path.resolve(__dirname, "../");
const dist = path.resolve(root, "dist");
const src = path.resolve(root, "src");
const app = path.resolve(root, "src");
const pages = path.resolve(src, "pages");
const dll = path.resolve(dist, "dll");
const nodeModules = path.resolve(root, "node_modules");
const template = path.resolve(src, "html");
module.exports = {
  root,
  dist,
  src,
  app,
  pages,
  dll,
  nodeModules,
  template,
};
