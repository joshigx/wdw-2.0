// app/lib/prisma.server.ts
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import process from "node:process";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export function createPrismaClient() {
  return new PrismaClient({
    adapter,
  });
}
