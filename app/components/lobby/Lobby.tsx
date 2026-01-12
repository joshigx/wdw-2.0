import LobbyNotStarted from "./LobbyNotStarted.tsx";
import LobbyStarted from "./LobbyStarted.tsx";

interface LobbyProps {
  roomId: string | undefined;
  users: {
    name: string;
  }[];
  origin: string | undefined;
}

export default function Lobby(props: LobbyProps) {
  return (
    <div className="mt-15 grid place-items-center gap-4 pl-10">
      <h1>Willkommen in der Lobby</h1>
      {(!props.roomId) ? <LobbyNotStarted></LobbyNotStarted> : (
        <LobbyStarted
          id={props.roomId}
          loggedUser={props.users}
          origin={props.origin}
        />
      )}
    </div>
  );
}
