import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import Draggable from "./Draggable.tsx";
import type { UserModel } from "../generated/prisma/models/User.ts";
import Droppable from "./Droppable.tsx";
import type { loggedAnswer, Viewport } from "../types/types.ts";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import type { DraggablePositon } from "../helpers/calculateGridPosition.ts";
import type { DroppablePositon } from "../helpers/calculateDroppablePositions.ts";

interface GameBoardProps {
  users: UserModel[];
  dnd: {
    droppedOverID: UniqueIdentifier | null;
    loggedAnswers: loggedAnswer[];
    setLoggedAnswers: React.Dispatch<React.SetStateAction<loggedAnswer[]>>;
    handleDragStart: (e: DragStartEvent) => void;
    handleDragEnd: (e: DragEndEvent) => void;
    initialPositions: DraggablePositon;
    initialDroppablePositions: DroppablePositon;
    viewport: Viewport;
  };

  answersSubmitted: boolean;
}

export default function GameBoard(props: GameBoardProps) {
  return (
    <div>
      <DndContext
        onDragStart={props.dnd.handleDragStart}
        onDragEnd={props.dnd.handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div>
          {props.users.map((user: UserModel) => (
            <Draggable
              startPosition={props.dnd.initialPositions[user.id]}
              key={user.id}
              id={user.id}
              snapBack={false}
              className={`
                    min-h-24 w-45 cursor-pointer rounded bg-yellow-500 px-4
                    py-2.5 text-center text-black select-none
                  `}
              viewport={props.dnd.viewport}
              positionsOfDroppable={props.dnd.initialDroppablePositions}
            >
              Anwort: {user.answer}
            </Draggable>
          ))}
        </div>

        <div>
          {props.users.map((user: UserModel) => (
            <Droppable
              id={user.id}
              key={user.id}
              droppedOverID={props.dnd.droppedOverID}
              startPosition={props.dnd.initialDroppablePositions[user.id]}
              className={`
                    min-h-25 w-50 cursor-pointer rounded px-4 py-2.5 text-center
                    text-black select-none
                  `}
              loggedAnswers={props.answersSubmitted
                ? props.dnd.loggedAnswers
                : null}
            >
              {user.name}
            </Droppable>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
