import type { UserModel } from "../../generated/prisma/models/User.ts";
import type { RoomModel } from "../../generated/prisma/models/Room.ts";
import NoRoomYet from "./NoRoomYet.tsx";
import RoomButNoId from "./RoomButNoId.tsx";
import RoomAndIdButNoAnswer from "./RoomAndIdButNoAnswer.tsx";
import AnswerSend from "./AnswerSend.tsx";

interface ClientProps {
  room: RoomModel | null;
  user: UserModel | null;
}

export default function Client(props: ClientProps) {
  const roomObject = props.room;
  const userObject = props.user;

  if (!roomObject) {
    return <NoRoomYet />;
  }
  if (!userObject) {
    return <RoomButNoId room={roomObject} />;
  }
  if (!userObject?.answer) {
    return <RoomAndIdButNoAnswer />;
  }
  if (userObject?.answer) {
    return (
      <AnswerSend
        user={userObject}
      />
    );
  }
}
