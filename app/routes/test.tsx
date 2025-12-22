import type { Route } from "./+types/test.ts";
import { Pool } from "pg";

// Diese Funktion läuft server-side
export async function loader({ params }: Route.LoaderArgs) {







  
  return ("");
}


export default function Home() {
  return (
  <>
  <p>Test</p>
</>
  );
}
