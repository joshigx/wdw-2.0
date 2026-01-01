import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import type { Route } from "./+types/game.ts";

import Draggable from "../components/Draggable.tsx";
import users from "./api/testUsers.json" with { type: "json" };
import { ClientOnly } from "../components/ClientOnly.tsx";
import Droppable from "../components/Droppable.tsx";
import { useEffect, useState } from "react";
import getInitialPositions, {GRID_CONFIG} from "../helpers/calculateGridPosition.ts";

interface _Room {
  id: string;
  users: number[];
}

interface User {
  id: string;
  locationId: string;
  name: string;
  answer: string;
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "wdw Game" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ }: Route.LoaderArgs) {
  const typedUsers: User[] = users as User[];
  const _lenght = typedUsers.length;

  return typedUsers;
}

export default function Game({ loaderData }: Route.ComponentProps) {


  //States
  const [viewport, setViewport] = useState({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
  });

  const [dropedOverID, setDroppedOverID] = useState<UniqueIdentifier | null>(
    null,
  );


  //identifier-Declaration
  const users: User[] = loaderData;
  const initialPositions = getInitialPositions(users, viewport);


  //Effects
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      });
      console.log("breite: "+ globalThis.innerWidth + ", höhe " + globalThis.innerHeight);
      
    };

    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);


  //EventHandler-Declaration für DnD-Context
  const handleDragStart = (e: DragStartEvent) => {
    console.log("ID vom gestareten Element: " + e.active.id);
  };
  const handleDragMove = (_e: DragMoveEvent) => {
  };

  const handleDragOver = (_e: DragOverEvent) => {
  };

  const handleDragEnd = (e: DragEndEvent) => {
    console.log(
      "Das Draggable: " + e.active.id + " wurde auf " + e.over?.id +
      " gedroppt",
    );

    if (e.over?.id) {
      setDroppedOverID(e.over.id);
    } else {
      setDroppedOverID(null);
    }
  };

  return (
    <ClientOnly>
      <DndContext
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        
      >
        <div>
        {users.map((user: User) => (

          <Draggable
            startPosition={initialPositions[user.id]}
            key={user.id}
            id={user.id}
            snapBack={false}
            // onDragEnd={(
            //   event,
            // ) => (console.log(
            //   "Veränderung insgesamt x, y: " + event.deltaSum.x.toFixed(0) +
            //   " " + event.deltaSum.y.toFixed(0),
            // ))}
            className={`text-black bg-yellow-500 min-h-${Math.floor(GRID_CONFIG.cellHeight/4)} px-4 py-2.5 w-${Math.floor(GRID_CONFIG.cellWidth/4)} text-center  rounded cursor-pointer select-none`}
          >
            Anwort: {user.answer}
          </Draggable>

        ))}
        </div>
        <Draggable id="123">
          <Droppable
            droppedOverID={dropedOverID}
            id="peter"
          >
            Peter
          </Droppable>
        </Draggable>

        <Draggable id="124">
          <Droppable
            droppedOverID={dropedOverID}
            id="horst"
          >
            Horst
          </Droppable>
        </Draggable>
      </DndContext>
    </ClientOnly>
  );
}
