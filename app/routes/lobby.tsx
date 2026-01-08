import type { Route } from "./+types/lobby.ts";
import prisma from "../lib/prisma.ts";
import LobbyNotStarted from "../components/lobby/LobbyNotStarted.tsx";
import LobbyStarted from "../components/lobby/LobbyStarted.tsx";
import { redirect, useRevalidator } from "react-router";
import { useEffect } from "react";
import { PATH } from "../config/URLS.ts";

export async function action({
  request,
  params,
}: Route.ActionArgs) {
  const formData: FormData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "startRound") {
    console.log("startRoundButton geclickt");
    const _updateRoom = await prisma.room.update({
      where: {
        id: params.cuid,
      },
      data: {
        isRunning: true,
      },
    });

    return redirect(`/${PATH.GAME}/${params.cuid}`);
  } else if (intent === "startGame") {
    console.log("startGameButton geclickt");

    const room = await prisma.room.create({
      data: {},
    });

    console.log("Raum erstellt:", room);
    return redirect(`/${PATH.LOBBY}/${room.id}`);
  }
  //neuen Raum inder Datenbanmk erstellen
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(props: Route.LoaderArgs) {
  const users = await prisma.user.findMany({
    where: {
      locationId: props.params.cuid,
      answer: { not: null },
    },
    select: {
      name: true, // Nur Namen laden
    },
  });

  return {
    roomId: props.params.cuid,
    users,
    origin: undefined as string | undefined,
  };
}

// Client Loader: Ergänzt Browser-spezifische Daten
export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  // Server-Daten abrufen
  const serverData = await serverLoader();

  // Browser-spezifische Daten hinzufügen
  return {
    ...serverData,
    origin: globalThis.location.origin, // Nur im Browser verfügbar!
  };
}
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Lobby(props: Route.ComponentProps) {
  const { roomId: roomId, users, origin } = props.loaderData;

  //  const id = props.loaderData.props.params.cuid;

  const revalidator = useRevalidator();

  useEffect(() => {
    // Alle 3 Sekunden Daten neu laden
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 3000);

    // Cleanup beim Unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-15 grid place-items-center gap-4 pl-10">
      <h1>Willkommen in der Lobby</h1>
      {(!roomId) ? <LobbyNotStarted></LobbyNotStarted> : (
        <LobbyStarted
          id={roomId}
          loggedUser={users}
          origin={origin}
        />
      )}
    </div>
  );
}
