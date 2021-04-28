const RestProxy = require("sp-rest-proxy");
const portfinder = require("portfinder");

export class RollupPluginSPRestProxy {
  constructor(settings = { port: 9090, hostname: "localhost" }) {
    this.settings = settings;
    this.serve = new RestProxy(this.settings);
  }

  viteProxySetting(proxy = {}) {
    return {
      "/_api": {
        target: `http://${this.settings.hostname}:${this.settings.port}/`,
        changeOrigin: true,
        secure: false,
      },
      ...proxy,
    };
  }

  rollupPlugin() {
    let server = this.serve;
    let settings = this.settings;
    return {
      name: "rollup-plugin-sp-rest-proxy",
      buildStart() {
        portfinder
          .getPortPromise({
            port: settings.port,
            stopPort: settings.port,
          })
          .then((port) => {
            server.serve();
          })
          .catch((err) => {
            console.log(
              `${err.message},if sp-rest-proxy already running, please ignore this message, otherwise you should change other port to proxy`
            );
          });
      },
    };
  }
}
export default RollupPluginSPRestProxy;
