//usend in game.tsx

import type { DragEndEvent } from "@dnd-kit/core";
import type { loggedAnswer } from "../../types/types.ts";

export function onDragEnd(
  e: DragEndEvent,
  loggedAnswers: loggedAnswer[],
  setLoggedAnswers: React.Dispatch<React.SetStateAction<loggedAnswer[]>>,
) {
  const isOverDroppable: boolean = !!e.over;
  const droppableIsOccupied: boolean = loggedAnswers.some((item) =>
    item.droppableZoneId === e.over?.id
  );

  if (isOverDroppable && !droppableIsOccupied) {
    setLoggedAnswers((prev) => {
      // a) Erst altes Vorkommen dieser Antwort entfernen (egal wo sie war)
      //diese funktion führt über jedem Element des Arrays diese Prüffunktion aus und behält nur die,
      //welche true zurück geben, also in dem Fall behält er nur die, Answers, die nicht mit dem Aktiven draggable übereinstimmen
      const filtered = prev.filter((item) => item.answerId !== e.active.id);

      // b) Dann neuen Eintrag hinzufügen
      return [
        ...filtered,
        { droppableZoneId: e.over!.id, answerId: e.active.id },
      ];
    });
  } else if (isOverDroppable && droppableIsOccupied) {
    console.log(
      "Über dieser dropzone befindet sich bereits etwas, deswegen wird diese anwort nicht eingeloggt",
    );

    //TODO: doppeltes EInloggen verhindern
  } else if (!isOverDroppable) {
    console.log("Das Draggable wurde nicht über einer dropzone losgelassen");
    //ebenfalls ausloggen
    //ausloggfunktion bauen und dann doppelten code ersetzen
    setLoggedAnswers((prev) => {
      // Prüfen, ob das Element überhaupt existiert (optional für Logging, aber gut für Logik)
      const exists = prev.some((item) => item.answerId === e.active.id);

      if (exists) {
        console.log("war vorher aber in einer -> wird entfernt");
        // Neues Array zurückgeben OHNE das Element
        return prev.filter((item) => item.answerId !== e.active.id);
      }

      // Wenn es nicht existierte, nichts ändern (alten State zurückgeben)
      return prev;
    });
  }
}
