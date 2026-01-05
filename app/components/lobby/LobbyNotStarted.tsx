import { Form } from "react-router";
import Button, { Color } from "../Button.tsx";

  interface LobbyNotStartedProps {
    path? : string
  }


export default function LobbyNotStarted(props: LobbyNotStartedProps) {



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
      <div>
        {startHostingButton}
      </div>
    </Form>
  );
}
