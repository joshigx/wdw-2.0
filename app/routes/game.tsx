import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import type { Route } from "./+types/game.ts";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import prisma from "../lib/prisma.ts";
import Draggable from "../components/Draggable.tsx";
import users from "./api/testUsers.json" with { type: "json" };
import { ClientOnly } from "../components/ClientOnly.tsx";
import Droppable from "../components/Droppable.tsx";
import { useEffect, useState } from "react";
import getInitialPositions from "../helpers/calculateGridPosition.ts";
import getInitialDroppablePositions from "../helpers/calculateDroppablePositions.ts";
import type { loggedAnswer, Viewport } from "../types/types.ts";
import ControlBar from "../components/ControlBar.tsx";
import { onDragEnd } from "../helpers/onDragEnd.ts";
import type { UserModel } from "../generated/prisma/models/User.ts";
import { redirect } from "react-router";
import { PATH } from "../config/URLS.ts";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "wdw Game" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({
  request,
  params,
}: Route.ActionArgs) {
  const formData: FormData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "startNewRound") {
    console.log("StartNewRound Button pressed");
    const roomId = params.cuid;

    const _updateUsers = await prisma.user.updateMany({
      where: {
        locationId: roomId, // Filtert nach locationId
      },
      data: {
        answer: null, // Setzt answer auf null
      },
    });

    const _updateRoom = await prisma.room.update({
      where: {
        id: params.cuid,
      },
      data: {
        isRunning: false,
      },
    });

    return redirect(`/${PATH.LOBBY}/${params.cuid}`);
  }
}

export async function loader(props: Route.LoaderArgs) {
  let typedUsers: UserModel[] | null = null;

  //wenn nicht die Demo version läuft, sonder das richtige spiel mit raum id
  if (props.params.cuid) {
    const roomId = props.params.cuid;
    typedUsers = await prisma.user.findMany({
      where: {
        locationId: roomId,
        answer: { not: null },
      },
    });
  } else {
    typedUsers = users as UserModel[];
  }

  const _lenght = typedUsers.length;

  return typedUsers;
}

export default function Game({ loaderData }: Route.ComponentProps) {
  //States

  //speichert die aktuelle viewport größe
  const [viewport, setViewport] = useState<Viewport>({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
  });

  //speicht die id der dropzone, über der zuletzt etwas losgelassen wurde
  const [dropedOverID, setDroppedOverID] = useState<UniqueIdentifier | null>(
    null,
  );

  //beinhaltet ein Array vom Typ loggedAnswer, mit allen bisher eingeloggeten Antworten
  //in der DragEnd Funktion werden die Antworten hinzugefügt / entfernt
  const [loggedAnswers, setLoggedAnswers] = useState<loggedAnswer[]>([]);

  //sagt aus, ob alle Anworten eingeloggt und dann abgeschickt worden
  const [answersSubmitted, setAnswersSubmitted] = useState(false);

  //speicherrt die Versuche
  const [attempts, setAttempts] = useState(0);

  //identifier-Declaration
  const users: UserModel[] = loaderData;

  //lädt / berechnet die initialen positionen der draggables und droppables
  const initialPositions = getInitialPositions(users, viewport);
  const initialDroppablePositions = getInitialDroppablePositions(
    users,
    viewport,
  );

  //Effects

  //wird ausgelöst, wenn die Seite das erste mal geladen wird
  useEffect(() => {
    //fügt event listener für fenster größen änderung hinzu
    const handleResize = () => {
      setViewport({
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      });
      console.log(
        "breite: " + globalThis.innerWidth + ", höhe " + globalThis.innerHeight,
      );
    };

    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  //wird ausgelöst, wenn sich der loggedAnswers state ändert
  useEffect(() => {
    setAnswersSubmitted(false);
    console.log(loggedAnswers);

    console.log(
      "Es sind " + loggedAnswers.length + " / " + users.length + " eingeloggt",
    );

    if (loggedAnswers.length === users.length) {
      console.log("Alles eingeloggt");
    }
  }, [loggedAnswers]);

  //EventHandler-Declaration für DnD-Context
  const handleDragStart = (e: DragStartEvent) => {
    console.log("ID vom gestareten Element: " + e.active.id);
  };
  const handleDragMove = (_e: DragMoveEvent) => {
  };

  const handleDragOver = (_e: DragOverEvent) => {
  };

  //wird ausgelöst, wenn das ziehen beendet wird und das item losgelassen wird
  const handleDragEnd = (e: DragEndEvent) => {
    onDragEnd(e, loggedAnswers, setLoggedAnswers, setDroppedOverID);
  };

  //wird ausgelöst, wenn "Antwort prüfen" gedrückt wurde
  function submitAnswers() {
    console.log("Antwort prüfen wurde gedrückt");
    if (loggedAnswers.length === users.length) {
      console.log("Alles eingeloggt");

      setAttempts((s) => s + 1);

      setAnswersSubmitted(true);
    } else {
      alert(`Du hast noch nicht alle Karten eingeloggt`);
      setAnswersSubmitted(false);
    }
  }

  return (
    <div className="">
      <ClientOnly>
        <div>
          <DndContext
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <div>
              {users.map((user: UserModel) => (
                <Draggable
                  startPosition={initialPositions[user.id]}
                  key={user.id}
                  id={user.id}
                  snapBack={false}
                  className={`
                    min-h-24 w-45 cursor-pointer rounded bg-yellow-500 px-4
                    py-2.5 text-center text-black select-none
                  `}
                  viewport={viewport}
                  positionsOfDroppable={initialDroppablePositions}
                >
                  Anwort: {user.answer}
                </Draggable>
              ))}
            </div>

            <div>
              {users.map((user: UserModel) => (
                <Droppable
                  id={user.id}
                  key={user.id}
                  droppedOverID={dropedOverID}
                  startPosition={initialDroppablePositions[user.id]}
                  className={`
                    min-h-25 w-50 cursor-pointer rounded px-4 py-2.5 text-center
                    text-black select-none
                  `}
                  loggedAnswers={answersSubmitted ? loggedAnswers : null}
                >
                  {user.name}
                </Droppable>
              ))}
            </div>
          </DndContext>
        </div>

        <ControlBar
          testAnswers={submitAnswers}
          attempts={attempts}
        >
        </ControlBar>
      </ClientOnly>
    </div>
  );
}
