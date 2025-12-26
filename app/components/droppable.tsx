
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable({ children, id }: { children: React.ReactNode, id: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  
  // const style = {
  //   padding: '50px',
  //   backgroundColor: isOver ? 'lightgreen' : 'lightgray',
  //   border: '2px solid black'
  // };

   const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}