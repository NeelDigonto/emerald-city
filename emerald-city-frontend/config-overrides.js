const { alias } = require("react-app-rewire-alias");

module.exports = function override(config, env) {
  alias({
    "@src": "src",
    "@components": "src/components",
    "@core": "src/core",
    "@lib": "src/lib",
    "@backend/types/api/": "../emerald-city-backend/src/types/api",
  })(config);

  /*   config.module.rules.push({
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: ["raw-loader", "glslify-loader"],
  });

  config.module.rules.push({
    test: /\.(hdr|exr)$/,
    exclude: /node_modules/,
    use: ["raw-loader"],
  }); */

  /*   config.module.rules.push({
    test: /\.hdr|exr/,
    type: "asset/resource",
  }); */

  /*   config.module.rules.push({
    test: /\.(hdr|exr)$/,
    exclude: /node_modules/,
    use: ["file-loader"],
  }); */

  return config;
};
