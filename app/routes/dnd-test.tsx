// dnd.tsx
import { useState } from 'react';
import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core';

import Draggable from '../components/draggable.tsx';
import Droppable from '../components/droppable.tsx';





export default function Dnd() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const containers = ['A', 'B', 'C', 'D'];
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  //const id = useId();

  function handleDragEnd(event: DragEndEvent) {

    const { delta } = event;
    setPosition((current) => ({
      x: current.x + delta.x,
      y: current.y + delta.y
    }))


    //const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    //setParent(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>

      <Draggable position={position} id="draggable">Drag me</Draggable>

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {'Drop here in Container: ' + id}
        </Droppable>
      ))}
    </DndContext>
  );


};


