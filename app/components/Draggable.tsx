//import { CSS } from '@dnd-kit/utilities';
import { type ReactNode, useCallback, useState } from "react";
import { useCustomDraggable } from "../hooks/useCustomDraggable.ts";
import type { DragEndEvent } from "../hooks/useCustomDraggable.ts";

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
};

export default function Draggable(props: DraggableProps) {
  const { snapBack = false } = props;
  const [position, setPosition] = useState({
    x: (props.startPosition?.x || 0),
    y: (props.startPosition?.y || 0),
  });

  /**
   * Handles the drag end event and updates the position of the draggable component.
   * If `snapBack` is `false`, the position is updated based on the drag delta.
   * Additionally, it invokes the `onDragEnd` callback from the parent component, if provided.
   *
   * @param event - The drag end event containing information about the drag operation.
   */
  const onDragEnd = useCallback((event: DragEndEvent) => {
    if (snapBack === false) {
      setPosition((prev) => ({
        x: prev.x + event.delta.x,
        y: prev.y + event.delta.y,
      }));
    }

    props.onDragEnd?.(event);
  }, [snapBack, props.onDragEnd]);

  const { attributes, listeners, setNodeRef, transform } = useCustomDraggable({
    id: props.id,
    onDragEnd: onDragEnd,
  });

  const style = {
    position: "absolute" as const, // Feste Position im Dokument
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={props.className}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}
