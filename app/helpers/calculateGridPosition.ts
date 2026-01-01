interface User {
  id: string;
  locationId: string;
  name: string;
  answer: string;
}

interface Viewport {
  width: number;
  height: number;
}

export type DraggablePositon = Record<string, { x: number; y: number }>;

export const GRID_CONFIG = {
  columns: 2,
  cellWidth: 200,
  cellHeight: 100,
  marginX: 70,
  marginY: 50,
};

function calculateGridPosition(
  index: number,
  viewport: Viewport,
  numberOfUsers: number,
  columns: number,
  cellWidth: number,
  cellHeight: number,
  marginX: number = 16,
  marginY: number = 16,

) {

  //aktuelle Spalte für den aktuelle Index
  //Bsp: 10 Elemente, 3 Spalten: (0-index): 0%3=0 (Spalte 1) 1%3=0 (Spalte 1) 3 (4. ELement) % 3 = 0 (wieder 1. Spalte aber schon in der 2. Zeile)
  const col = index % columns;
  const row = Math.floor(index / columns);

  return {
    x: col * (cellWidth + marginX) + ((viewport.width/2)-((cellWidth*columns)/2)),
    y: row * (cellHeight + marginY) + ((viewport.height/2)-(((Math.floor(numberOfUsers/columns+1))*(cellHeight+marginY))/2)),
  };


}

export default function getInitialPositions(users: User[], viewport: Viewport): DraggablePositon {
  const initialPositions: DraggablePositon = {};

  users.forEach((user, index, users) => {
    initialPositions[user.id] = calculateGridPosition(
      index,
      viewport,
      users.length,
      GRID_CONFIG.columns,
      GRID_CONFIG.cellWidth,
      GRID_CONFIG.cellHeight,
      GRID_CONFIG.marginX,
      GRID_CONFIG.marginY,
    );
  });

  return initialPositions;
}
