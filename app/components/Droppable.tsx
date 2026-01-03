import { type ReactNode, useEffect } from "react";
import { type UniqueIdentifier, useDroppable } from "@dnd-kit/core";

type Props = {
  children?: ReactNode;
  id: string;
  className?: string;
  droppedOverID?: UniqueIdentifier | null | undefined;
  startPosition?: { x: number; y: number; customStyle?: string };
  draggable?: boolean;
  snapBack?: boolean;
};

export default function Droppable(props: Props) {
  //isOver gibt es auch noch
  const droppableObj = useDroppable({
    id: props.id,
  });

  //const [textColor, setTextColor] = useState<string>("undefined")
  //const textColor = droppable.isOver ? "green" : "white";

  useEffect(() => {
    if (props.id === props.droppedOverID) {
      console.log(
        "Über mir (" + props.id + ") wurde etwas gedroppt." +
          props.droppedOverID,
      );
    }
  }, [props.droppedOverID]);

  const style = {
    //color: textColor,
    position: "absolute" as const, // Feste Position im Dokument
    left: `${props.startPosition?.x || 0}px`,
    top: `${props.startPosition?.y || 0}px`,
    zIndex: -1,
  };

  return (
    <div
      ref={droppableObj.setNodeRef}
      style={style}
      className={`${props.className} ${props.startPosition?.customStyle} ${droppableObj.isOver ? "bg-gray-500" : "bg-gray-300" } `}
    >
      {props.children}
    </div>
  );
}
