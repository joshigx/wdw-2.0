import type { UserModel } from "../../generated/prisma/models/User.ts";
import prisma from "../../lib/prisma.ts";
import type { Route } from "../../../.react-router/types/app/routes/game/+types/game.ts";
import users from "../api/testUsers.json" with { type: "json" };

export async function loader(props: Route.LoaderArgs) {
  let typedUsers: UserModel[] | null = null;

  //wenn nicht die Demo version läuft, sonder das richtige spiel mit raum id
  if (props.params.cuid) {
    const roomId = props.params.cuid;
    typedUsers = await prisma.user.findMany({
      where: {
        locationId: roomId,
        answer: { not: null },
      },
    });
  } else {
    typedUsers = users as UserModel[];
  }

  const _lenght = typedUsers.length;

  return typedUsers;
}
