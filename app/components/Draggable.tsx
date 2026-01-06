//import { CSS } from '@dnd-kit/utilities';
import { type ReactNode, useEffect, useState } from "react";
import type { DragEndEvent } from "../hooks/useCustomDraggable.ts";
import type { Viewport } from "../types/types.ts";
import {
  DRAGGABLE_GRID_CONFIG,
  DROPPABLE_GRID_CONFIG,
} from "../helpers/config.ts";
import type { Transform } from "@dnd-kit/utilities";
import { type Over, useDraggable } from "@dnd-kit/core";
import {
  type DroppablePositon,
} from "../helpers/calculateDroppablePositions.ts";

/**
 * Properties for a Draggable component.
 *
 * Required:
 * - id: A unique string identifier for this draggable instance. This is used to
 *   identify and distinguish draggable items (for accessibility, rehydration,
 *   or managing multiple draggables).
 *
 * Optional props:
 * - children: ReactNode to be rendered inside the draggable container.
 *
 * - startPosition: An object with numeric x and y coordinates that specify the
 *   initial position of the draggable element. Coordinates are in pixels and
 *   should be interpreted relative to the draggable container or the element's
 *   positioning context.
 *
 * - className: Optional CSS class name(s) applied to the draggable wrapper so
 *   callers can style or theme the element.
 *
 * - snapBack: When true, the draggable will animate or reset back to its
 *   startPosition (or original layout position) after a drag ends. When false,
 *   the element will remain where the user released it. Default: false.
 *
 * - onDragEnd: Callback invoked when a drag operation completes. The callback
 *   receives a DragEndEvent (from the underlying drag implementation) that
 *   typically contains information such as the final position, velocity, and
 *   the original event. Consumers can use this to persist state, trigger
 *   side-effects, or prevent the snap-back behavior.
 *
 * @remarks
 * - Ensure `id` is unique among sibling draggables to avoid collisions.
 * - The exact shape of DragEndEvent depends on the drag library in use; import
 *   or reference the appropriate type from that library to get full typings.
 *
 * @example
 * // Typical usage:
 * // <Draggable id="item-1" startPosition={{ x: 0, y: 0 }} snapBack onDragEnd={handleEnd}>
 * //   <Card />
 * // </Draggable>
 */

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
      className={`${props.className} hover:bg-amber-500`}
      {...draggableObj.listeners}
      {...draggableObj.attributes}
    >
      {props.children}
    </div>
  );
}
