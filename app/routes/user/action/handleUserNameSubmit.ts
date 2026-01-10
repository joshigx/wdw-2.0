import { redirect } from "react-router";
import type { UserModel } from "../../../generated/prisma/models/User.ts";
import prisma from "../../../lib/prisma.ts";
import { PATH } from "../../../config/URLS.ts";

export default async function handleUserNameSubmit(
  formData: FormData,
  roomId: string,
  user: UserModel | null,
): Promise<Response> {
  {
    //submit username code
    const name = formData.get("userName") as string || "";

    //eventuell noch sicherheitsabfrage, dass roomId wirklich gülitg ist, obwohl es das sein müsste
    if (name && roomId) {
      user = await prisma.user.create({
        data: {
          name: name,
          locationId: roomId!,
        },
      });
    }

    console.log("User angelegt: " + user);
    return redirect(`/${PATH.CLIENT}/${roomId}/${user?.id}`);
  }
}
