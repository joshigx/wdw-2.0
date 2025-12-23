import type { Route } from "../../.react-router/types/app/routes/+types/home.ts";
//import type { User } from "../generated/prisma/client.ts";
import type { UserModel as User } from "../generated/prisma/models/User.ts";
import { createPrismaClient } from "../lib/prisma.server.ts";
import type { PrismaClient } from "../generated/prisma/client.ts";
import Title from "../components/title.tsx"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ }: Route.LoaderArgs) {


  const prisma: PrismaClient = createPrismaClient();
  try {
    const users: User[] = await prisma.user.findMany({
      where: {
        name: "Tim Schubert"
      }

    });

    return { users: users };
  }
  finally {
    await prisma.$disconnect();
  }


}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <Title title=" n" />
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user: User) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ol>
    </div>
  );
}