import type { Route } from "../../../../.react-router/types/app/routes/user/+types/user.ts";
import type { RoomModel } from "../../../generated/prisma/models/Room.ts";
import type { UserModel } from "../../../generated/prisma/models/User.ts";
import handleAnswerSubmit from "./handleAnswerSubmit.ts";
import handleUserNameSubmit from "./handleUserNameSubmit.ts";

export async function action({
  request,
  params,
}: Route.ActionArgs) {
  const user: UserModel | null = null;
  const room: RoomModel | null = null;
  const formData: FormData = await request.formData();
  const intent = formData.get("intent");
  const roomId = params.roomId;
  const userId = params.userId;

  if (intent === "submitAnswer") {
    return (handleAnswerSubmit(formData, room, roomId!, user, userId!));
  } else if (intent === "submitUserName") {
    return (handleUserNameSubmit(formData, roomId!, user));
  }
}
