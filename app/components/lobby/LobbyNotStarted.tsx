import { Form } from "react-router";
import Button, { Color } from "../Button.tsx";

export default function LobbyNotStarted() {
  const startHostingButton = (
    <Button
      bgColor={Color.GREEN}
      type="submit"
    >
      Spiel starten
    </Button>
  );

  return (
    <Form method="post">
      <input type="hidden" name="intent" value="startGame"></input>
      <div>
        {startHostingButton}
      </div>
    </Form>
  );
}
