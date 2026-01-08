import { useDraggable } from "@dnd-kit/core";
import { type ReactNode } from "react";

type DraggableProps = {
  id: string;
  children: ReactNode;
  position: { x: number; y: number };
};

export default function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = {
    position: "absolute" as const, // Feste Position im Dokument
    left: `${props.position.x}px`,
    top: `${props.position.y}px`,
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
      className={`
        box-border rounded-full border border-transparent bg-amber-700 px-4
        py-2.5 text-sm leading-5 font-medium text-white shadow-xs
        focus:ring-4 focus:outline-none
      `}
    >
      {props.children}
    </button>
  );
}
