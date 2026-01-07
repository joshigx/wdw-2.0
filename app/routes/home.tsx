import type { Route } from "../../.react-router/types/app/routes/+types/home.ts";
//import type { User } from "../generated/prisma/client.ts";
import { Link } from "react-router";
import Footer from "../components/footer.tsx";

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

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-25">
        <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
          Willkommen auf josua-lucas.de
        </h1>
        <Link
          to="/host/lobby"
          className="bg-emerald-800 p-4  text-orange-100 rounded-full"
        >
          Zum 'wer-denkt-was'-Spiel
        </Link>
      </div>
      <Footer></Footer>
    </>
  );
}
