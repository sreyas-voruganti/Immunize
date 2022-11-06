const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-transculent",
    themeColor: "#fefcfe",
  },
});
