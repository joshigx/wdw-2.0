import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("host/game/:cuid?", "./routes/game.tsx"),
  route("host/lobby/:cuid?", "./routes/lobby.tsx"),
  route("client/:roomId?/:userId?", "./routes/client.tsx"),
] satisfies RouteConfig;
