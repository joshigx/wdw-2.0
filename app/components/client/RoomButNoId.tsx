import { Form } from "react-router";
import type { RoomModel } from "../../generated/prisma/models/Room.ts";
import Button, { Color } from "../Button.tsx";

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

          <Form method="post">
            <input type="hidden" name="intent" value="submitUserName"></input>
            <input
              className="bg-amber-200 text-black"
              type="text"
              name="userName"
            />

            <Button bgColor={Color.GREEN} type="submit">Submit</Button>
          </Form>
        </div>
      )}
    </div>
  );
}
