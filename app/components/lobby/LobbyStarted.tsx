import { QRCodeSVG } from "qrcode.react";
import { ClientOnly } from "../ClientOnly.tsx";
interface LobbyStartedProps {
  id: string;
  origin?: string;
  loggedUser: {
    name: string;
  }[];
}

export default function LobbyStarted(props: LobbyStartedProps) {

  return (
    <>



      <div>
        Die Lobby wurde mit folgender id gestartet: {props.id}
        <QRCodeSVG
          value={`${props.origin}/client/${props.id}`}
          size={256}
          level="H"
          marginSize={4}
        />

        Link: {`${props.origin}/client/${props.id}`}
      </div>

      <div>
        <p>Folgende Nutzer haben ihre antwort abgeschickt</p>
        {props.loggedUser.map((user: { name: string }) => (
          <p>
            {user.name}
          </p>
        ))}
      </div>
    </>

  );
}
