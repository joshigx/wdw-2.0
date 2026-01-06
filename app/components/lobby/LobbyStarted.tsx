import { QRCodeSVG } from "qrcode.react";
interface LobbyStartedProps {
  id: string;
}

export default function LobbyStarted(props: LobbyStartedProps) {
  const joinUrl = `${globalThis.location.origin}/client/${props.id}/join`;

  return (
    <div>
      Die Lobby wurde mit folgender id gestartet: {props.id}
      <QRCodeSVG
        value={joinUrl}
        size={256}
        level="H"
        marginSize={4}
      />

      Link: {joinUrl}
    </div>
  );
}
