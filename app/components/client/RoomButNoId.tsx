import type { RoomModel } from "../../generated/prisma/models/Room.ts";

interface RoomButNoIdProps {
  room: RoomModel | null;
}

export default function RoomButNoId(props: RoomButNoIdProps) {
  const roomIsValid: boolean = !!props.room;

  return (
    <div>
      {!roomIsValid ? "ungültiger Raum" : (
        <div>
          "gültiger Raum"
          {
            //hier User-Erstellungslogik einbauen
          }
        </div>
      )}
    </div>
  );
}
