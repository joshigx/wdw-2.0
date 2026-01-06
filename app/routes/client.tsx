import { useState } from "react";
import type { RoomModel } from "../generated/prisma/models/Room.ts";
import type { UserModel } from "../generated/prisma/models/User.ts";
import type { Route } from "../../.react-router/types/app/routes/+types/client.ts";
import NoRoomYet from "../components/client/NoRoomYet.tsx";
import prisma from "../lib/prisma.ts";
import RoomButNoId from "../components/client/RoomButNoId.tsx";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(props: Route.LoaderArgs) {
  let room: RoomModel | null = null;

  if (props.params.roomId) {
    room = await prisma.room.findUnique({
      where: {
        id: props.params.roomId,
      },
    });
  }


  return { props, room };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [roomObject, setRoomObect] = useState(loaderData.room);
  const roomIdParam = loaderData.props.params.roomId;
  const userId = loaderData.props.params.userId;



  const LobbyAndId = (
    <div>
      "Gib dein Wort hier ein"
    </div>
  );

  return (
    <div>
      {!roomIdParam
        ? <NoRoomYet />
        : ((roomIdParam && !userId)
          ? <RoomButNoId room={roomObject} />
          : LobbyAndId)}
    </div>
  );
}
