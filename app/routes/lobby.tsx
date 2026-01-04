import type { Route } from "./+types/lobby.ts";
import prisma from "../lib/prisma.ts";
import Button, { Color } from "../components/Button.tsx";
import LobbyNotStarted from "../components/lobby/LobbyNotStarted.tsx";
import LobbyStarted from "../components/lobby/LobbyStarted.tsx";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader(props: Route.LoaderArgs) {
  return props.params;
}

export default function Lobby({ loaderData }: Route.ComponentProps) {
  const id = loaderData.cuid;

  return (
    <>
      {(!id) ? <LobbyNotStarted></LobbyNotStarted> : (
        <LobbyStarted
          id={id}
        />
      )}
    </>
  );
}
