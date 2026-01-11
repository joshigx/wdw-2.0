import type { UniqueIdentifier } from "@dnd-kit/core";
import type { loggedAnswer } from "../../types/types.ts";

//wird in Droppable aufgerufen


export function validateAnswers(
  loggedAnswers: loggedAnswer[] | null,
  droppableId: UniqueIdentifier,
  setLocalAnswerState: (value: number) => void,
  allAnswersLoggedIn: boolean
) {
  if (loggedAnswers) {
    console.log("Alles eingeloggt (neu): " + allAnswersLoggedIn);
    
    loggedAnswers.forEach((answer) => {
      if (answer.droppableZoneId === droppableId) {

        if (answer.answerId === answer.droppableZoneId) {
          //richtige Anwort
          setLocalAnswerState(1);
        } else {
          setLocalAnswerState(-1);
        }
      }
    });
  } else {
    setLocalAnswerState(0);
    console.log("setLocalAnswerState 0 wurde aufgerufen");
    
  }
}
