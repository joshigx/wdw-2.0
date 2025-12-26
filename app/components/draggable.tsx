import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';



export default function Draggable({ children, id }: { children: ReactNode, id: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });




  const style = {
    transform: CSS.Translate.toString(transform),
  };





  return (
    <>
      <button type="button"
        ref={setNodeRef}
        // className="text-white bg-brand box-border bg-amber-700 border border-transparent 
        // hover:bg-brand-strong hover:bg-amber-900 
        // focus:ring-4 focus:ring-brand-medium 
        // shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
        style={style} {...listeners} {...attributes}
      >
        {children}
      </button>
    </>
  );
}