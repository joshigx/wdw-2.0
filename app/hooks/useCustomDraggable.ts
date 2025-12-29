import { useEffect, useState } from "react";
import { useDraggable, type UseDraggableArguments } from "@dnd-kit/core";

export interface DragEndEvent {
  //delta is how much the draggable has moved from drag start to drag end
  delta: { x: number; y: number };
  //platz für weitere eigenschaften, die im DragEndEvent ausgelseen werden sollten
}

interface CustomDraggableArgs extends UseDraggableArguments {
  onDragEnd?: (event: DragEndEvent) => void;
}

export function useCustomDraggable(
  { onDragEnd, ...draggableArgs }: CustomDraggableArgs,
) {
  const draggable = useDraggable(draggableArgs);

  const { transform } = draggable;
  const [lastTransform, setLastTransform] = useState(transform);

  useEffect(() => {
    if (lastTransform && transform === null) {
      //if draggable is let gone, run onDragEnd Function, with the DragEndEvent parameters (until now just delta)
      onDragEnd?.({
        delta: {
          x: lastTransform.x,
          y: lastTransform.y,
        },
      });
    }

    setLastTransform(transform);
  }, [transform, onDragEnd]);

  return draggable;
}
