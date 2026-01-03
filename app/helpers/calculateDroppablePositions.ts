import { DROPPABLE_GRID_CONFIG as GRID_CONFIG, controlBarHeight } from "./config.ts";
import type { Viewport, User  } from "../types/types.ts";


interface CardsPerSide {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type DraggablePositon = Record<
  string,
  { x: number; y: number; customStyle: string }
>;

function calculateGridPosition(
  index: number,
  viewport: Viewport,
  cardsPerSide: CardsPerSide,
  _numberOfUsers: number,
  cellWidth: number,
  cellHeight: number,
  margin: number = 15,
) {
  //viewport.height=viewport.height-controlBarHeight;
  //berechnet in welchen seite die card kommt (0: oben, 1: rechts, 2: unten, 3: links)
  const side = index % 4;

  //berechnet welche stelle das k#rtchen it dem index an seiner positon (oben unten usw) einnimmt
  const place = Math.floor(index / 4) + 1;
  const offsetY = cellHeight / 2;

  switch (side) {
    //top
    case 0: {
      const n = cardsPerSide.top;
      const baseX = place * Math.floor(viewport.width / (n + 1));
      return {
        x: baseX - ((cellWidth + margin) / 2),
        y: margin,
        customStyle: "",
      };
    }

    //right
    case 1: {
      const n = cardsPerSide.right;
      const baseY = place * Math.floor(viewport.height / (n + 1));

      return {
        x: viewport.width - (cellWidth + margin),
        y: baseY - offsetY,
        customStyle: "",
      };
    }
    //bottom
    case 2: {
      const n = cardsPerSide.bottom;
      const baseX = place * Math.floor(viewport.width / (n + 1));
      return {
        x: baseX - ((cellWidth + margin) / 2),
        y: viewport.height - (cellHeight + margin),
        customStyle: `flex items-end justify-center `,
      };
    }
    //left
    case 3: {
      const n = cardsPerSide.left;
      const baseY = place * Math.floor(viewport.height / (n + 1));

      return {
        x: margin,
        y: baseY - offsetY,
        customStyle: "",
      };
    }
  }

  return {
    x: 0,
    y: 0,
    customStyle: "",
  };

  //basis koordinaten für jede karte (der punkt ist immer oben links bei dem jeweiligen container)

  //DIe Anzahl an Pixeln, die man das Element verschieben muss, damit alle ganz mittig sind, sowohl x und y
}

export default function getInitialDroppablePositions(
  users: User[],
  viewport: Viewport,
): DraggablePositon {
  const initialPositions: DraggablePositon = {};
  const numberOfUsers = users.length;
  const viewportWithOffset: Viewport = {
    height: viewport.height-controlBarHeight,
    width: viewport.width,
  };

  //Berechnet die aufteilung auf die vier bildschirm seiten
  const remainder = numberOfUsers % 4;
  const baseNumber = Math.floor(numberOfUsers / 4);
  const cardsPerSide: CardsPerSide = {
    top: baseNumber + ((remainder >= 1) ? 1 : 0),
    right: baseNumber + ((remainder >= 2) ? 1 : 0),
    bottom: baseNumber + ((remainder >= 3) ? 1 : 0),
    left: baseNumber,
  };

  users.forEach((user, index) => {
    initialPositions[user.id] = calculateGridPosition(
      index,
      viewportWithOffset,
      cardsPerSide,
      numberOfUsers,
      GRID_CONFIG.cellWidth,
      GRID_CONFIG.cellHeight,
      GRID_CONFIG.margin,
    );
  });

  return initialPositions;
}
