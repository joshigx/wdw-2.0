import { QRCodeSVG } from "qrcode.react";
import { Form } from "react-router";
import Button, { Color } from "../Button.tsx";
import { PATH } from "../../config/URLS.ts";
interface LobbyStartedProps {
  id: string;
  origin?: string;
  loggedUser: {
    name: string;
  }[];
}

export default function LobbyStarted(props: LobbyStartedProps) {
  return (
    <div className="grid place-items-center gap-4">
      <p>
        Scannt den QR-Code mit euren Smartphones um eure Anworten zu senden
      </p>
      <QRCodeSVG
        className="m-5"
        value={`${props.origin}/${PATH.CLIENT}/${props.id}`}
        size={256}
        level="H"
        marginSize={4}
      />

      Alternativ öffnet auf eurem Smartphone folgenden Link:{" "}
      <a href={`${props.origin}/${PATH.CLIENT}/${props.id}`}>
        {`${props.origin}/${PATH.CLIENT}/${props.id}`}
      </a>

      <p>
        Wenn ihr alle eure Antworten eingegeben habt, klickt auf den Knopf um
        loszulegen!
      </p>
      <Form method="post">
        <input type="hidden" name="intent" value="startRound"></input>
        <Button
          bgColor={Color.GREEN}
          onClick={() => (console.log("Ich wurde gedrückt"))}
          type="submit"
        >
          Runde starten
        </Button>
      </Form>

      <p>Folgende Nutzer haben ihre Antwort bereits gesendet:</p>
      {props.loggedUser.map((user: { name: string }) => (
        <p>
          {user.name}
        </p>
      ))}
    </div>
  );
}
