//import { CSS } from '@dnd-kit/utilities';
import { type ReactNode, useCallback, useState } from "react";
import { useCustomDraggable } from "../hooks/useCustomDraggable.ts";
import type { DragEndEvent } from "../hooks/useCustomDraggable.ts";

type DraggableProps = {
  id: string;
  children?: ReactNode;
  startPosition?: { x: number; y: number };
  //onDragEnd?: (event: DragEndEvent) => void;
};

export default function Draggable(props: DraggableProps) {
  const [position, setPosition] = useState({
    x: (props.startPosition?.x || 0),
    y: (props.startPosition?.y || 0),
  });

  const onDragEnd = useCallback((event: DragEndEvent) => {
    setPosition((prev) => ({
      x: prev.x + event.delta.x,
      y: prev.y + event.delta.y,
    }));
  }, []);

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
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="text-white bg-brand box-border bg-amber-700 border border-transparent 
         hover:bg-brand-strong hover:bg-amber-900 
         focus:ring-4 focus:ring-brand-medium 
         shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
    >
      {props.children}
    </button>
  );
}
