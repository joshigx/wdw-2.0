import {
  index,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("params", [
    index("routes/paramlos.tsx"),
    route(":pid", "routes/paramtest.tsx"),
  ]),
  route("test", "routes/test.tsx"),
] satisfies RouteConfig;
