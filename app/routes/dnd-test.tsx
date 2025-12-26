// dnd.tsx
import { useState } from 'react';
import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core';

import Draggable from '../components/draggable.tsx';
import Droppable from '../components/droppable.tsx';





export default function Dnd() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  //const id = useId();

  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );



  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup : 'Drop here in Container: ' + id}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const {over} = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};


