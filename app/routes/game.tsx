// dnd.tsx

import { DndContext } from "@dnd-kit/core";
import type { Route } from "./+types/game.ts";

import Draggable from "../components/userAnswerDraggablev2.tsx";
import users from "./api/testUsers.json" with { type: "json" };

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

  return (
    <DndContext>
      {users.map((user: User) => (
        <Draggable
          startPosition={startPos}
          key={user.id}
          id={user.id}
        >
          Anwort: {user.answer}
        </Draggable>
      ))}
    </DndContext>
  );
}
