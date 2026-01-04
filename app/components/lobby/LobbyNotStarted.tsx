import Button, { Color } from "../Button.tsx";

interface LobbyNotStartedProps {
}

export default function LobbyNotStarted() {
  const startHostingButton = (
    <Button
      bgColor={Color.GREEN}
    >
      Spiel starten
    </Button>
  );

  return (
    <div>
      {startHostingButton}
    </div>
  );
}
