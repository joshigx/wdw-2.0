import {
  index,
  route,
  layout,
  prefix,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/header-footer.tsx", [
    index("./routes/home.tsx"),
    route("about", "./routes/about.tsx"),
  ]

  ),
] satisfies RouteConfig;
