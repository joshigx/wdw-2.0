
import { type ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';


type Props = {
  children: ReactNode
  id: string
}

export default function Droppable(props: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
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
      {props.children}
    </div>
  );
}