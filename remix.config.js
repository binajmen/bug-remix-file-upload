const { flatRoutes } = require("remix-flat-routes");

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverModuleFormat: "cjs",
  tailwind: true,
  postcss: true,
  future: {},
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes, { enableUniqueIdCheck: false });
  },
  serverDependenciesToBundle: [
    "nanoid",
    "react-dnd",
    "react-dnd-html5-backend",
    "react-dnd-touch-backend",
    "@react-dnd/invariant",
    "dnd-core",
    "@react-dnd/shallowequal",
    "@react-dnd/asap",
  ],
};
