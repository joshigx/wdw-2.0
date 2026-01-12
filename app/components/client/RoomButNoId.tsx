import { Form } from "react-router";
import type { RoomModel } from "../../generated/prisma/models/Room.ts";
import Button, { Color } from "../general/Button.tsx";

interface RoomButNoIdProps {
  room: RoomModel | null;
}

export default function RoomButNoId(props: RoomButNoIdProps) {
  const roomIsValid: boolean = !!props.room;

  return (
    <div>
      {!roomIsValid ? "ungültiger Raum" : (
        <div>
          {props.room?.isRunning
            ? "Spiel läuft gerade, warte bis es zu Ende ist"
            : (
              <div className="mt-10 grid place-items-center gap-4">
                <p>Gib deinen Namen ein:</p>
                <Form method="post" className="grid place-items-center gap-5">
                  <input type="hidden" name="intent" value="submitUserName" />
                  <input
                    className="rounded-full bg-white p-3 text-black"
                    type="text"
                    name="userName"
                  />

                  <Button bgColor={Color.GREEN} type="submit">
                    Raum beitreten
                  </Button>
                </Form>
              </div>
            )}
          {
            //hier User-Erstellungslogik einbauen
          }
        </div>
      )}
    </div>
  );
}
