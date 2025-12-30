import { DragDropProvider } from "@dnd-kit/react";
import NextDraggable from "./NextDraggable.tsx";
import NextDroppable from "./NextDroppable.tsx";
import NextDragDropMonitor from "./NextDragDropMonitor.tsx";
import { useState } from "react";

export default function App() {
  const [isDropped, setIsDropped] = useState(false);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { target } = event.operation;

        setIsDropped(target?.id === "droppable");
      }}
    >
      <NextDragDropMonitor></NextDragDropMonitor>

      {!isDropped && <NextDraggable />}

      <NextDroppable id="droppable">
        {isDropped && <NextDraggable />}
      </NextDroppable>
    </DragDropProvider>
  );
}
