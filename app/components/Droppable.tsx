import { type ReactNode, useEffect, useState } from "react";
import { type UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { type loggedAnswer } from "../types/types.ts"

type Props = {
  children?: ReactNode;
  id: string;
  className?: string;
  droppedOverID?: UniqueIdentifier | null | undefined;
  startPosition?: { x: number; y: number; customStyle?: string };
  draggable?: boolean;
  snapBack?: boolean;
  loggedAnswers?: loggedAnswer[] | null
};

export default function Droppable(props: Props) {
  //isOver gibt es auch noch

  //0 = noch nichts eingeloggt (standard), 1 richtige Anwrot, -1 falsche antwort
  const [answerState, setAnswerState] = useState(0);


  useEffect(() => {
    if (props.loggedAnswers) {
      props.loggedAnswers.forEach((answer) => {

        if (answer.droppableZoneId === props.id) {
          if (answer.answerId === answer.droppableZoneId) {
            //richtige Anwort
            setAnswerState(1)
          }

          else {
            setAnswerState(-1)
          }
        }
      })
    }

    else {
      setAnswerState(0)
    }



  }, [props.loggedAnswers, props.id])



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
      className={`${props.className} ${props.startPosition?.customStyle} ${droppableObj.isOver ? "bg-gray-500" : ((answerState === 0) ? "bg-gray-300" : (answerState === -1 ? "bg-red-700" : (answerState === 1 ? "bg-green-600" : "bg-gray-300")))
        } `}
    >
      {props.children}
    </div>
  );
}
