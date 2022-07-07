const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@src": "src",
    "@components": "src/components",
    "@core": "src/core",
    "@lib": "src/lib",
  })(config);

  return config;
};
