import { index, route, type RouteConfig } from "@react-router/dev/routes";
import { PATH } from "./config/URLS.ts";

export default [
  index("./routes/home.tsx"),
  route(`${PATH.GAME}/:cuid?`, "./routes/game/game.tsx"),
  route(`${PATH.LOBBY}/:cuid?`, "./routes/lobby.tsx"),
  route(`${PATH.CLIENT}/:roomId?/:userId?`, "./routes/client.tsx"),
] satisfies RouteConfig;
