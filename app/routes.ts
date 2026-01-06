import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/header-footer.tsx", [
    index("./routes/home.tsx"),
    route("about", "./routes/about.tsx"),
  ]),
  route("app", "./routes/dnd-test.tsx"),
  route("game", "./routes/game.tsx"),

  route("host/lobby/:cuid?", "./routes/lobby.tsx"),
  route("client/:roomId?/:userId?", "./routes/client.tsx"),
] satisfies RouteConfig;
