import { useState } from "react";
import type { loggedAnswer, Viewport } from "../../types/types.ts";
import type {
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { onDragEnd } from "../../helpers/onDragEnd.ts";
import getInitialPositions from "../../helpers/calculateGridPosition.ts";
import getInitialDroppablePositions from "../../helpers/calculateDroppablePositions.ts";
import type { UserModel } from "../../generated/prisma/models/User.ts";

export function useDragAndDrop(users: UserModel[]) {
  //speicht die id der dropzone, über der zuletzt etwas losgelassen wurde
  const [droppedOverID, setDroppedOverID] = useState<UniqueIdentifier | null>(
    null,
  );

  //speichert die aktuelle viewport größe
  const [viewport, setViewport] = useState<Viewport>({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
  });

  //beinhaltet ein Array vom Typ loggedAnswer, mit allen bisher eingeloggeten Antworten
  //in der DragEnd Funktion werden die Antworten hinzugefügt / entfernt
  const [loggedAnswers, setLoggedAnswers] = useState<loggedAnswer[]>([]);

  //lädt / berechnet die initialen positionen der draggables und droppables
  const initialPositions = getInitialPositions(users, viewport);
  const initialDroppablePositions = getInitialDroppablePositions(
    users,
    viewport,
  );

  //EventHandler-Declaration für DnD-Context
  const handleDragStart = (e: DragStartEvent) => {
    console.log("ID vom gestareten Element: " + e.active.id);
  };

  //wird ausgelöst, wenn das ziehen beendet wird und das item losgelassen wird
  const handleDragEnd = (e: DragEndEvent) => {
    onDragEnd(e, loggedAnswers, setLoggedAnswers, setDroppedOverID);
  };

  return ({
    droppedOverID,
    loggedAnswers,
    setLoggedAnswers,
    handleDragStart,
    handleDragEnd,
    initialPositions,
    initialDroppablePositions,
    viewport,
    setViewport,
  });
}
