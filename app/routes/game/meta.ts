import type { Route } from "../../../.react-router/types/app/routes/game/+types/game.ts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "wdw Game" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
