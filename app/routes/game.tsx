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

import calculateGridPosition from "../helpers/calculateGridPosition.ts";

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

  const GRID_CONFIG = {
    columns: 2,
    cellWidth: 350,
    cellHeight: 50,
    margin: 100,
    offsetX: 200,
    offsetY: 200
  };

  const initialPositions: Record<string, { x: number; y: number }> = {};

  users.forEach((user, index) => {
    initialPositions[user.id] = calculateGridPosition(
      index,
      GRID_CONFIG.columns,
      GRID_CONFIG.cellWidth,
      GRID_CONFIG.cellHeight,
      GRID_CONFIG.margin,
      GRID_CONFIG.offsetX,
      GRID_CONFIG.offsetY
    );
  });

  const [dropedOverID, setDroppedOverID] = useState<
    UniqueIdentifier | null | undefined
  >(null);

  const dragStart = (e: DragStartEvent) => {
    console.log("ID vom gestareten Element: " + e.active.id);
  };
  const dragMove = (_e: DragMoveEvent) => {
  };

  const dragOver = (_e: DragOverEvent) => {
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
            className="text-white bg-amber-600 rounded-full px-4 py-2.5"
          >
            Anwort: {user.answer}
          </Draggable>
        ))}

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
