import type { Route } from "../../../.react-router/types/app/routes/user/+types/user.ts";
import type { RoomModel } from "../../generated/prisma/models/Room.ts";
import type { UserModel } from "../../generated/prisma/models/User.ts";
import prisma from "../../lib/prisma.ts";

export async function loader(props: Route.LoaderArgs) {
  let room: RoomModel | null = null;
  let user: UserModel | null = null;

  if (props.params.roomId) {
    room = await prisma.room.findUnique({
      where: {
        id: props.params.roomId,
      },
    });
  }

  if (props.params.userId) {
    user = await prisma.user.findUnique(
      {
        where: {
          id: props.params.userId,
        },
      },
    );
  }

  return { room, user };
}
