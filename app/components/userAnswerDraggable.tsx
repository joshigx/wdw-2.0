import { useDraggable } from '@dnd-kit/core';
//import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState, type ReactNode } from 'react';



type DraggableProps = {
  id: string,
  children?: ReactNode
  startPosition?: { x: number, y: number }
}

export default function Draggable(props: DraggableProps) {


  /**
   * State hook to manage the position of a draggable element.
   * 
   * @constant
   * @type {React.State<{ x: number; y: number }>}
   * @default { x: 0, y: 0 }
   * 
   * @description
   * Initializes the position state with default values of `x` and `y` set to `0`.
   * If `props.startPosition` is provided, its `x` and `y` values are added to the default values.
   * 
   * @param {Object} props.startPosition - Optional starting position for the draggable element.
   * @param {number} [props.startPosition.x=0] - Initial x-coordinate offset.
   * @param {number} [props.startPosition.y=0] - Initial y-coordinate offset.
   */
  const [position, setPosition] = useState({ x: 0 + (props.startPosition?.x || 0), y: 0 + (props.startPosition?.y || 0) });





  /**
   * Custom hook destructuring for enabling draggable functionality.
   *
   * @constant
   * @property {Object} attributes - Attributes to be spread onto the draggable element.
   * @property {Object} listeners - Event listeners for handling drag events.
   * @property {Function} setNodeRef - Ref setter function for the draggable element.
   * @property {Object} transform - Transformation data for the draggable element, such as position.
   *
   * @param {Object} props - The properties passed to the draggable component.
   * @param {string} props.id - A unique identifier for the draggable element.
   */
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const [lastTransform, setLastTransform] = useState(transform);



  
  useEffect(() => {
    if (lastTransform && (transform===null)) {
      setPosition((prev) => ({
        x: prev.x + lastTransform.x,
        y: prev.y + lastTransform.y,
      }));
    }
    setLastTransform(transform);
  }, [transform]);


  const style = {
    position: 'absolute' as const,  // Feste Position im Dokument
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    touchAction: 'none', 
  };


  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      {...listeners} {...attributes}
      className="text-white bg-brand box-border bg-amber-700 border border-transparent 
         hover:bg-brand-strong hover:bg-amber-900 
         focus:ring-4 focus:ring-brand-medium 
         shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"

    >
      {props.children}
    </button>

  );
}