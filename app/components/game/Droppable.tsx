import { type ReactNode, useEffect, useState } from "react";
import { type UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { type loggedAnswer } from "../../types/types.ts";
import { showResults as handleResults } from "../../routes/game/showResults.ts";

type Props = {
  children?: ReactNode;
  id: string;
  className?: string;
  droppedOverID?: UniqueIdentifier | null | undefined;
  startPosition?: { x: number; y: number; customStyle?: string };
  draggable?: boolean;
  snapBack?: boolean;
  loggedAnswers: loggedAnswer[] | null;
  isShowingResults: boolean;
};

export default function Droppable(props: Props) {

  //0 = noch nichts eingeloggt (standard), 1 richtige Anwrot, -1 falsche antwort
  const [localAnswerState, setLocalAnswerState] = useState(0);
  const thisDroppableId = props.id;


  const droppableObj = useDroppable({
    id: thisDroppableId,
  });



  //handleResult
  useEffect(() => {
    handleResults(
      props.loggedAnswers,
      thisDroppableId,
      setLocalAnswerState,
      props.isShowingResults
    );
  }, [props.isShowingResults, props.id]);


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
      className={`
        ${props.className}
        ${props.startPosition?.customStyle}
        ${droppableObj.isOver
          ? "bg-gray-500"
          : ((localAnswerState === 0)
            ? "bg-gray-300"
            : (localAnswerState === -1
              ? "bg-red-700"
              : (localAnswerState === 1 ? "bg-green-600" : "bg-gray-300")))
        }
      `}
    >
      {props.children}
    </div>
  );
}
