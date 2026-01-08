import { index, route, type RouteConfig } from "@react-router/dev/routes";
import {ROUTES} from "./config/URLS.ts"

export default [
  index("./routes/home.tsx"),
  route(`${ROUTES.GAME}/:cuid?`, "./routes/game.tsx"),
  route(`${ROUTES.LOBBY}/:cuid?`, "./routes/lobby.tsx"),
 route(`${ROUTES.CLIENT}/:roomId?/:userId?`, "./routes/client.tsx"),
] satisfies RouteConfig;
