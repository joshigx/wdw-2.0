import { useEffect, useState } from "react";
import type { loggedAnswer, Viewport } from "../../types/types.ts";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { onDragEnd } from "./onDragEnd.ts";
import getInitialPositions from "../../helpers/calculateGridPosition.ts";
import getInitialDroppablePositions from "../../helpers/calculateDroppablePositions.ts";
import type { UserModel } from "../../generated/prisma/models/User.ts";

export function useDragAndDrop(
  users: UserModel[],
) {
  //speicht die id der dropzone, über der zuletzt etwas losgelassen wurde

  //speichert die aktuelle viewport größe
  const [viewport, setViewport] = useState<Viewport>({
    width: globalThis.innerWidth,
    height: globalThis.innerHeight,
  });

  //wird ausgelöst, wenn die Seite das erste mal geladen wird
  useEffect(() => {
    //fügt event listener für fenster größen änderung hinzu
    const handleResize = () => {
      setViewport({
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      });
      console.log(
        "breite: " + globalThis.innerWidth + ", höhe " + globalThis.innerHeight,
      );
    };

    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

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
    onDragEnd(e, loggedAnswers, setLoggedAnswers);
  };

  return ({
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
