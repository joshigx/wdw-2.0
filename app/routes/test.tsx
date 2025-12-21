import type { Route } from "./+types/test.ts";
import { Pool } from "pg";

// Diese Funktion läuft server-side
export async function loader({ params }: Route.LoaderArgs) {


  const pool = new Pool();

  const _createTable = await pool.query('CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL)');
  const _inserData = await pool.query("INSERT INTO users (name) VALUES('peter'),('max')");
  



  
  return ("");
}


export default function Home() {
  return (
  <>
  <p>Test</p>
</>
  );
}
