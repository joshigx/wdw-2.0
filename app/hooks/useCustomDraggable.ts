import { useEffect, useRef, useState } from "react";
import { useDraggable, type UseDraggableArguments } from "@dnd-kit/core";
import type { Viewport } from "../types/types.ts";

/**
 * Represents the event triggered when a drag operation ends.
 *
 * @interface DragEndEvent
 * @property {Object} delta - The change in position of the draggable element from the start to the end of the drag.
 * @property {number} delta.x - The horizontal distance moved.
 * @property {number} delta.y - The vertical distance moved.
 * @property {Object} deltaSum - The cumulative change in position of the draggable element all drag operations.
 * @property {number} deltaSum.x - The total horizontal distance moved.
 * @property {number} deltaSum.y - The total vertical distance moved.
 */
export interface DragEndEvent {
  //delta is how much the draggable has moved from drag start to drag end
  delta: { x: number; y: number };
  deltaSum: { x: number; y: number };
  //platz für weitere eigenschaften, die im DragEndEvent ausgelseen werden sollten
}

/**
 * Extends the `UseDraggableArguments` interface to provide additional
 * customization options for draggable elements.
 *
 * @interface CustomDraggableArgs
 * @extends UseDraggableArguments
 *
 * @property {function} [onDragEnd] - Optional callback function that is
 * invoked when a drag operation ends. Receives a `DragEndEvent` as its argument.
 */
interface CustomDraggableArgs extends UseDraggableArguments {
  onDragEnd?: (event: DragEndEvent) => void;
  viewport?: Viewport;
}

/**
 * A custom hook that extends the functionality of a draggable element.
 * It tracks the cumulative drag transformations and triggers a callback
 * when the dragging ends.
 *
 * @param {CustomDraggableArgs} args - The arguments for the draggable hook.
 * @param {Function} [args.onDragEnd] - A callback function that is invoked
 * when the dragging ends. It receives an object containing the delta of the
 * last drag and the cumulative delta of all drags.
 * @returns {ReturnType<typeof useDraggable>} - The draggable object returned
 * by the `useDraggable` hook.
 *
 * @example
 * ```tsx
 * const draggable = useCustomDraggable({
 *   onDragEnd: ({ delta, deltaSum }) => {
 *     console.log('Drag ended with delta:', delta);
 *     console.log('Cumulative delta:', deltaSum);
 *   },
 *   otherDraggableArgs: {  other args  },
 * });
 * ```
 */

export function useCustomDraggable(
  { onDragEnd, ...draggableArgs }: CustomDraggableArgs,
) {
  const draggable = useDraggable(draggableArgs);
  const { transform } = draggable;
  const [lastTransform, setLastTransform] = useState(transform);
  const allTransforms = useRef({ x: 0, y: 0 });

  //runs everytime the transform obeject changes (when drag starts, runs or ends)
  useEffect(() => {
    
    //if draggable is let gone (when the transform object changes back to null and the lastTransform is not null, so a transform already happend),
    if (lastTransform && transform === null) {
      allTransforms.current.x += lastTransform.x;
      allTransforms.current.y += lastTransform.y;

      // run onDragEnd Function (provided by the Component which uses this hook as Callback), with the DragEndEvent parameters
      onDragEnd?.({
        delta: {
          x: lastTransform.x,
          y: lastTransform.y,
        },
        deltaSum: {
          x: allTransforms.current.x,
          y: allTransforms.current.y,
        },
      });
    }

    setLastTransform(transform);
  }, [transform, onDragEnd]);

  return draggable;
}
