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
import { useState } from "react";

interface Room {
  id: string;
  users: number[];
}

interface User {
  id: string;
  locationId: string;
  name: string;
  answer: string;
}

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
  const users: User[] = loaderData;
  const startPos = { x: 70, y: 70 };
  const [dropedOverID, setDroppedOverID] = useState<
    UniqueIdentifier | null | undefined
  >(null);
  const [draggedOverID, setDraggedOverID] = useState<
    UniqueIdentifier | null | undefined
  >(null);

  const dragStart = (e: DragStartEvent) => {
    console.log("ID vom gestareten Element: " + e.active.id);
  };
  const dragMove = (_e: DragMoveEvent) => {
  };

  const dragOver = (e: DragOverEvent) => {
    if (e.over?.id) {
      setDraggedOverID(e.over.id);
    } else {
      setDraggedOverID(null);
    }
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
        onDragStart={dragStart}
        onDragMove={dragMove}
        onDragOver={dragOver}
        onDragEnd={handleDragEnd}
      >
        {users.map((user: User) => (
          <Draggable
            startPosition={startPos}
            key={user.id}
            id={user.id}
            snapBack={false}
            onDragEnd={(
              event,
            ) => (console.log(
              "Veränderung insgesamt x, y: " + event.deltaSum.x.toFixed(0) +
                " " + event.deltaSum.y.toFixed(0),
            ))}
            className="text-white bg-brand box-border 
  bg-amber-600 border border-transparent 
  hover:bg-brand-strong hover:bg-amber-900 
  focus:ring-4 focus:ring-brand-medium shadow-xs 
  focus:outline-none
  font-medium leading-5 rounded-full text-sm px-4 py-2.5 "
          >
            Anwort: {user.answer}
          </Draggable>
        ))}

        <Draggable id="123">
          <Droppable
            droppedOverID={dropedOverID}
            draggedOverID={draggedOverID}
            id="peter"
          >
            <div className="bg-amber-600">
              Peter
            </div>
          </Droppable>
        </Draggable>

        <Draggable id="124">
          <Droppable
            droppedOverID={dropedOverID}
            draggedOverID={draggedOverID}
            id="horst"
          >
            <div className="bg-amber-600">
              Horst
            </div>
          </Droppable>
        </Draggable>
      </DndContext>
    </ClientOnly>
  );
}
