import type { Route } from "./+types/lobby.ts";
import prisma from "../lib/prisma.ts";
import LobbyNotStarted from "../components/lobby/LobbyNotStarted.tsx";
import LobbyStarted from "../components/lobby/LobbyStarted.tsx";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  //neuen Raum inder Datenbanmk erstellen
  console.log("startGameButton geclickt");

  const room = await prisma.room.create({
    data: {},
  });

  console.log("Raum erstellt:", room);
  return redirect(`/host/lobby/${room.id}`);
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader(props: Route.LoaderArgs) {
  return props.params;
}

export default function Lobby(props: Route.ComponentProps) {
  const id = props.loaderData.cuid;

  return (
    <>
      <h1>Lobby</h1>
      {(!id) ? <LobbyNotStarted></LobbyNotStarted> : (
        <LobbyStarted
          id={id}
        />
      )}
    </>
  );
}
