// config-overrides.js
//const { alias, configPaths } = require("react-app-rewire-alias");
const {
  aliasDangerous,
  configPaths,
  CracoAliasPlugin,
} = require("react-app-rewire-alias/lib/aliasDangerous");

//const aliasMap = configPaths("./tsconfig.paths.json"); // or jsconfig.paths.json

//module.exports = alias(aliasMap);

module.exports = function override(config) {
  aliasDangerous({
    ...configPaths("./tsconfig.paths.json"),
  })(config);

  return config;
};
//module.exports.jest = aliasJest(aliasMap);

/* module.exports = function override(config, env) {
  alias({
    "@src": "src",
    "@components": "src/components",
    "@core": "src/core",
    "@lib": "src/lib",
    "@backend/types/api/": "../emerald-city-backend/src/types/api",
  })(config);

  return config;
}; */

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
