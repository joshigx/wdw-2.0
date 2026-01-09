import prisma from "../../lib/prisma.ts";
import type { Route } from "../../../.react-router/types/app/routes/game/+types/game.ts";
import { redirect } from "react-router";
import { PATH } from "../../config/URLS.ts";

export async function action({
  request,
  params,
}: Route.ActionArgs) {
  const formData: FormData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "startNewRound") {
    console.log("StartNewRound Button pressed");
    const roomId = params.cuid;

    const _updateUsers = await prisma.user.updateMany({
      where: {
        locationId: roomId, // Filtert nach locationId
      },
      data: {
        answer: null, // Setzt answer auf null
      },
    });

    const _updateRoom = await prisma.room.update({
      where: {
        id: params.cuid,
      },
      data: {
        isRunning: false,
      },
    });

    return redirect(`/${PATH.LOBBY}/${params.cuid}`);
  }
}
