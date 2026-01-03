import shuffleArray, { createArrayFromNtoM } from "./fisherYatesShuffle.ts";
import {
  controlBarHeight,
  DRAGGABLE_GRID_CONFIG as GRID_CONFIG,
} from "./config.ts";
import type { User, Viewport } from "../types/types.ts";

export type DraggablePositon = Record<string, { x: number; y: number }>;

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

  const numberOfRows: number = Math.floor((numberOfUsers - 1) / columns) + 1;

  //basis koordinaten für jede karte (der punkt ist immer oben links bei dem jeweiligen container)
  const baseX = col * (cellWidth + marginX);
  const baseY = row * (cellHeight + marginY);

  const totalGridWidth = cellWidth * columns + marginX * (columns - 1);
  const totalGridHeight = cellHeight * numberOfRows +
    marginY * (numberOfRows - 1);

  //DIe Anzahl an Pixeln, die man das Element verschieben muss, damit alle ganz mittig sind, sowohl x und y
  const offsetX = (viewport.width - totalGridWidth) / 2;
  const offsetY = (viewport.height - totalGridHeight) / 2;

  return {
    x: baseX + offsetX,
    y: baseY + offsetY,
  };
}

export default function getInitialPositions(
  users: User[],
  viewport: Viewport,
): DraggablePositon {
  const viewportWithOffset: Viewport = {
    height: viewport.height - controlBarHeight,
    width: viewport.width,
  };
  const initialPositions: DraggablePositon = {};
  const numberOfUsers = users.length;
  const columns = (numberOfUsers > 5) ? 3 : 2;
  const orderedArray = createArrayFromNtoM(0, numberOfUsers - 1);
  const shuffledArray = shuffleArray(orderedArray);
  users.forEach((user, index) => {
    initialPositions[user.id] = calculateGridPosition(
      shuffledArray[index],
      viewportWithOffset,
      numberOfUsers,
      columns,
      GRID_CONFIG.cellWidth,
      GRID_CONFIG.cellHeight,
      GRID_CONFIG.marginX,
      GRID_CONFIG.marginY,
    );
  });

  return initialPositions;
}
