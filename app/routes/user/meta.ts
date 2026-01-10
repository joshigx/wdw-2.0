import type { Route } from "../../../.react-router/types/app/routes/user/+types/user.ts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nutzerseite" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
