
export interface Viewport {
  width: number;
  height: number;
}



//overwrite later with prisma types, just for testing / develpoment
export interface User {
  id: string;
  locationId: string;
  name: string;
  answer: string;
}

export interface Room {
  id: string;
  users: number[];
}