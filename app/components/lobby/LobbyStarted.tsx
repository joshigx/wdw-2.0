interface LobbyStartedProps {
  id: string;
}

export default function LobbyStarted(props: LobbyStartedProps) {
  return (
    <div>
      Die Lobby wurde mit folgender id gestartet: {props.id}
    </div>
  );
}
