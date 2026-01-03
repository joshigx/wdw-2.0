import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import type { Route } from "./+types/game.ts";
import {
  createSnapModifier,
  restrictToWindowEdges,
  snapCenterToCursor,
} from "@dnd-kit/modifiers";

import Draggable from "../components/Draggable.tsx";
import users from "./api/testUsers.json" with { type: "json" };
import { ClientOnly } from "../components/ClientOnly.tsx";
import Droppable from "../components/Droppable.tsx";
import { useEffect, useState } from "react";
import getInitialPositions from "../helpers/calculateGridPosition.ts";
import getInitialDroppablePositions from "../helpers/calculateDroppablePositions.ts";
import type { User, Viewport } from "../types/types.ts";
import ControlBar from "../components/ControlBar.tsx";

type loggedAnswer = {
  droppableZoneId: UniqueIdentifier;
  answerId: UniqueIdentifier;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "wdw Game" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({}: Route.LoaderArgs) {
  const typedUsers: User[] = users as User[];
  const _lenght = typedUsers.length;

  return typedUsers;
}

export default function Game({ loaderData }: Route.ComponentProps) {
  //States
  const [viewport, setViewport] = useState<Viewport>({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
  });

  const [dropedOverID, setDroppedOverID] = useState<UniqueIdentifier | null>(
    null,
  );

  const [loggedAnswers, setLoggedAnswers] = useState<loggedAnswer[]>([]);
  const [allLoggedIn, setAllLoggedIn] = useState(false);

  //speicherrt die Versuche
  const [attempts, setAttempts] = useState(0);

  //identifier-Declaration
  const users: User[] = loaderData;
  const initialPositions = getInitialPositions(users, viewport);
  const initialDroppablePositions = getInitialDroppablePositions(
    users,
    viewport,
  );

  //Effects
  useEffect(() => {
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

  useEffect(() => {
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

  const handleDragEnd = (e: DragEndEvent) => {
    //wenn ein item über dropzone losgelassen wird
    if (e.over) {
      //wenn zu diesem droppable bereits eine anwort existiert nichts machen
      if (loggedAnswers.some((item) => item.droppableZoneId === e.over!.id)) {
        console.log(
          "Über dieser dropzone befindet sich bereits etwas, deswegen wird diese anwort nicht eingeloggt",
        );
      } //wenn über dropzone fallen gelassen und dropzone frei
      else {
        setLoggedAnswers((prev) => {
          // a) Erst altes Vorkommen dieser Antwort entfernen (egal wo sie war)
          const filtered = prev.filter((item) => item.answerId !== e.active.id);

          // b) Dann neuen Eintrag hinzufügen
          return [
            ...filtered,
            { droppableZoneId: e.over!.id, answerId: e.active.id },
          ];
        });
      }

      console.log(
        "Das Draggable: " + e.active.id + " wurde auf " + e.over?.id +
          " gedroppt",
      );
    } //wenn das item ins leere gezogen wird

    else {
      console.log("Das Draggable wurde nicht über einer dropzone losgelassen");

      //ebenfalls ausloggen
      //ausloggfunktion bauen und dann doppelten code ersetzen
      setLoggedAnswers((prev) => {
        // Prüfen, ob das Element überhaupt existiert (optional für Logging, aber gut für Logik)
        const exists = prev.some((item) => item.answerId === e.active.id);

        if (exists) {
          console.log("war vorher aber in einer -> wird entfernt");
          // Neues Array zurückgeben OHNE das Element
          return prev.filter((item) => item.answerId !== e.active.id);
        }

        // Wenn es nicht existierte, nichts ändern (alten State zurückgeben)
        return prev;
      });
    }

    if (e.over?.id) {
      setDroppedOverID(e.over.id);
    } else {
      setDroppedOverID(null);
    }
  };

  //wird ausgelöst, wenn "Antwort prüfen" gedrückt wurde
  function testAnswers() {
    console.log("Antwort prüfen wurde gedrückt");
    if (loggedAnswers.length === users.length) {
      console.log("Alles eingeloggt");

      setAttempts((s) => s + 1);
    } else {
      alert(`Du hast noch nicht alle Karten eingeloggt`);
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
              {users.map((user: User) => (
                <Draggable
                  startPosition={initialPositions[user.id]}
                  key={user.id}
                  id={user.id}
                  snapBack={false}
                  className={`text-black bg-yellow-500 min-h-24 px-4 py-2.5 w-45 text-center rounded cursor-pointer select-none`}
                  viewport={viewport}
                  positionsOfDroppable={initialDroppablePositions}
                >
                  Anwort: {user.answer}
                </Draggable>
              ))}
            </div>

            <div>
              {users.map((user: User) => (
                <Droppable
                  id={user.id}
                  key={user.id}
                  droppedOverID={dropedOverID}
                  startPosition={initialDroppablePositions[user.id]}
                  className={` text-black  min-h-25 px-4 py-2.5 w-50 text-center rounded cursor-pointer select-none`}
                >
                  {user.name}
                </Droppable>
              ))}
            </div>
          </DndContext>
        </div>

        <ControlBar
          testAnswers={testAnswers}
          attempts={attempts}
        >
        </ControlBar>
      </ClientOnly>
    </div>
  );
}
