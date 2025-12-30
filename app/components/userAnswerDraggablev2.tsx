//import { CSS } from '@dnd-kit/utilities';
import { type ReactNode, useCallback, useState } from "react";
import { useCustomDraggable } from "../hooks/useCustomDraggable.ts";
import type { DragEndEvent } from "../hooks/useCustomDraggable.ts";

type DraggableProps = {
  id: string;
  children?: ReactNode;
  startPosition?: { x: number; y: number };
  className?: string;
  snapBack?: boolean
  onDragEnd?: (event: DragEndEvent) => void;

};

export default function Draggable(props: DraggableProps) {
  const { snapBack = false } = props;
  const [position, setPosition] = useState({
    x: (props.startPosition?.x || 0),
    y: (props.startPosition?.y || 0),
  });

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
