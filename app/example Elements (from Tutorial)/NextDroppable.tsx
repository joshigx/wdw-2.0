import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

interface NextDraggableProps {
  id: string;
  children?: ReactNode;
}

export default function NextDroppable({ id, children }: NextDraggableProps) {
  const { ref, isDropTarget } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      style={{ width: 300, height: 300 }}
      className="flex justify-center bg-amber-600"
    >
      {isDropTarget ? "Draggable ist over me" : "Drop something on me"}
      {children}
    </div>
  );
}
