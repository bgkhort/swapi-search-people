/* eslint-env node */
const { configure } = require("quasar/wrappers");

module.exports = configure(function () {
  return {
    eslint: {
      fix: true,
      warnings: true,
      errors: true,
    },

    css: ["_global.scss"],

    extras: ["roboto-font", "material-icons"],

    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node16",
      },

      vueRouterMode: "history",
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {},

      iconSet: "material-icons", // Quasar icon set
      lang: "en-US", // Quasar language pack

      plugins: [],
    },

    animations: [],
  };
});
