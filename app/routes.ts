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
  route("app","./routes/dnd-test.tsx"),
  route("game", "./routes/game.tsx"),
] satisfies RouteConfig;
