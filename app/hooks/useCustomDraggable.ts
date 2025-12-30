import { useEffect, useRef, useState } from "react";
import { useDraggable, type UseDraggableArguments } from "@dnd-kit/core";

export interface DragEndEvent {
  //delta is how much the draggable has moved from drag start to drag end
  delta: { x: number; y: number };
  deltaSum: { x: number; y: number };
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
  const allTransforms= useRef({x: 0, y: 0});

  useEffect(() => {
    if (lastTransform && transform === null) {
      //if draggable is let gone, run onDragEnd Function, with the DragEndEvent parameters (until now just delta)
      allTransforms.current.x += lastTransform.x;
      allTransforms.current.y += lastTransform.y; 

      onDragEnd?.({
        delta: {
          x: lastTransform.x,
          y: lastTransform.y,
        },
        deltaSum: {
          x: allTransforms.current.x,
          y: allTransforms.current.y
        }
      });
    }

    setLastTransform(transform);
  }, [transform, onDragEnd]);

  return draggable;
}
