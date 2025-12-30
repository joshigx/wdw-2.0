import { useDraggable } from "@dnd-kit/react";

export default function Draggable() {
  const { ref } = useDraggable({
    id: "draggable",
  });

  return (
    <button
      type="button"
      ref={ref}
      className="text-white bg-brand box-border 
  bg-amber-600 border border-transparent 
  hover:bg-brand-strong hover:bg-amber-900 
  focus:ring-4 focus:ring-brand-medium shadow-xs 
  focus:outline-none
  font-medium leading-5 rounded-full text-sm px-4 py-2.5 "
    >
      Draggable Test
    </button>
  );
}
