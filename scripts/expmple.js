export function example() {
  return {
    name: "example",
    options() {
      console.log("options");
    },
    buildStart(...args) {
      console.log("buildStart");
    },
    buildEnd() {
      console.log("buildEnd");
    },
    closeBundle() {
      console.log("closeBundle");
    },
    config() {
      console.log("config");
    },
    configResolved() {
      console.log("configResolved");
    },
    configureServer() {
      console.log("configureServer");
    },
    transformIndexHtml() {
      console.log("transformIndexHtml");
    },
    handleHotUpdate() {
      console.log("handleHotUpdate");
    },
  };
}
