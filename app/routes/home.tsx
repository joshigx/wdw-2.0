import type { Route } from "../../.react-router/types/app/routes/+types/home.ts";
//import type { User } from "../generated/prisma/client.ts";
import type { UserModel as User } from "../generated/prisma/models/User.ts";
import { createPrismaClient } from "../lib/prisma.server.ts";
import type { PrismaClient } from "../generated/prisma/client.ts";
import Title from "../components/title.tsx";
import { Link, NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Josuas Website" },
    { name: "description", content: "Welcome to Josuas Website!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  // const prisma: PrismaClient = createPrismaClient();
  // try {
  //   const users: User[] = await prisma.user.findMany({
  //     where: {
  //       name: "Tim Schubert",
  //     },
  //   });

  //   return { users: users };
  // } finally {
  //   await prisma.$disconnect();
  // }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Willkommen auf josua-lucas.de
      </h1>
      <nav>
      <Link to="/host/lobby" className="bg-emerald-800 p-4  text-orange-100 rounded-full">
        Zum 'wer-denkt-was'-Spiel
      </Link>

    </nav>
    </div>
  );
}
