//import { CSS } from '@dnd-kit/utilities';
import { type ReactNode, useEffect, useState } from "react";
import type { DragEndEvent } from "../hooks/useCustomDraggable.ts";
import type { Viewport } from "../types/types.ts";
import {
  DRAGGABLE_GRID_CONFIG,
  DROPPABLE_GRID_CONFIG,
} from "../config/DragAndDropConfig.ts";
import type { Transform } from "@dnd-kit/utilities";
import { type Over, useDraggable } from "@dnd-kit/core";
import {
  type DroppablePositon,
} from "../helpers/calculateDroppablePositions.ts";

type DraggableProps = {
  id: string;
  children?: ReactNode;
  startPosition?: { x: number; y: number };
  className?: string;
  snapBack?: boolean;
  onDragEnd?: (event: DragEndEvent) => void;
  viewport: Viewport;
  positionsOfDroppable?: DroppablePositon;
};

export default function Draggable(props: DraggableProps) {
  const { snapBack = false } = props;
  const [position, setPosition] = useState({
    x: (props.startPosition?.x || 0),
    y: (props.startPosition?.y || 0),
  });

  const [lastTransform, setLastTransform] = useState<Transform | null>(null);
  const [lastOver, setLastOver] = useState<Over | null>(null);

  /**
   * Handles the drag end event and updates the position of the draggable component.
   * If `snapBack` is `false`, the position is updated based on the drag delta.
   * Additionally, it invokes the `onDragEnd` callback from the parent component, if provided.
   *
   * @param event - The drag end event containing information about the drag operation.
   */
  function onDragEnd(delta: { x: number; y: number }) {
    console.log("draggable wurde gedropt auf: " + lastOver?.id);

    if (lastOver && props.positionsOfDroppable) {
      console.log("snap to droppable wird ausgeführt");

      const snapPosition = props.positionsOfDroppable[lastOver.id];
      const offsetX = Math.floor(
        DROPPABLE_GRID_CONFIG.cellWidth - DRAGGABLE_GRID_CONFIG.cellWidth,
      ) / 2;
      const offsetY = DROPPABLE_GRID_CONFIG.cellHeight / 2.5;

      console.log("offsetX = " + offsetX);

      setPosition({
        x: snapPosition.x + offsetX,
        y: snapPosition.y + offsetY,
      });
    } else {
      if (snapBack === false) {
        setPosition((prev) => ({
          x: prev.x + delta.x,
          y: prev.y + delta.y,
        }));
      }
    }
  }

  const draggableObj = useDraggable({
    id: props.id,
  });

  //console.log(draggable.over?.id);

  useEffect(() => {
    if (lastTransform && draggableObj.transform === null) {
      // run onDragEnd Function (provided by the Component which uses this hook as Callback), with the DragEndEvent parameters
      onDragEnd({
        x: lastTransform.x,
        y: lastTransform.y,
      });
    }

    setLastOver(draggableObj.over);
    setLastTransform(draggableObj.transform);
  }, [draggableObj.transform]);

  const style = {
    position: "absolute" as const, // Feste Position im Dokument
    left: `${position.x}px`,
    top: `${position.y}px`,
    //transform: `translate3d(${((transform?.x || 0) + position.x) || 0}px, ${((transform?.y || 0) + position.y) || 0}px, 0)`,
    transform: `translate3d(${(draggableObj.transform?.x || 0) || 0}px, ${
      (draggableObj.transform?.y || 0) || 0
    }px, 0)`,
    zIndex: draggableObj.transform ? 1 : 0,
    touchAction: "none",
  };

  return (
    <div
      ref={draggableObj.setNodeRef}
      style={style}
      className={`
        ${props.className}
        hover:bg-amber-500
      `}
      {...draggableObj.listeners}
      {...draggableObj.attributes}
    >
      {props.children}
    </div>
  );
}
