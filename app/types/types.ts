import type { UniqueIdentifier } from "@dnd-kit/core";
export type { UserModel as User } from "../generated/prisma/models/User.ts";

export interface Viewport {
  width: number;
  height: number;
}

//overwrite later with prisma types, just for testing / develpoment

export type loggedAnswer = {
  droppableZoneId: UniqueIdentifier;
  answerId: UniqueIdentifier;
};
