import { type ReactNode, useEffect } from "react";
import { type UniqueIdentifier, useDroppable } from "@dnd-kit/core";

type Props = {
  children?: ReactNode;
  id: string;
  className?: string;
  droppedOverID?: UniqueIdentifier | null | undefined;
};

export default function Droppable(props: Props) {
  //isOver gibt es auch noch
  const { setNodeRef, isOver } = useDroppable({
    id: props.id,
  });

  //const [textColor, setTextColor] = useState<string>("undefined")
  const textColor = isOver ? "green" : "white";

  useEffect(() => {
    if (props.id === props.droppedOverID) {
      console.log("Über mir (" + props.id + ") wurde etwas gedroppt");
    }
  }, [props.droppedOverID]);

  const style = {
    color: textColor,
  };

  return (
    <div ref={setNodeRef} style={style} className={props.className}>
      {props.children}
    </div>
  );
}
