import type { Route } from "../../../.react-router/types/app/routes/user/+types/user.ts";
import Client from "../../components/client/Client.tsx";
export { action } from "./action/action.ts";
export { loader } from "./loader.ts";
export { meta } from "./meta.ts";

export default function Home({ loaderData }: Route.ComponentProps) {
  //enthält die RoomID des user oder null wenn er in noch keine Raum ist
  const room = loaderData.room;
  const user = loaderData.user;

  return (
    <Client
      room={room}
      user={user}
    />
  );
}
