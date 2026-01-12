import type { UniqueIdentifier } from "@dnd-kit/core";
import type { loggedAnswer } from "../../types/types.ts";

//wird in Droppable aufgerufen

export function showResults(
  loggedAnswers: loggedAnswer[] | null,
  droppableId: UniqueIdentifier,
  setLocalAnswerState: (value: number) => void,
  isShowingResults: boolean
) {
  if (isShowingResults && loggedAnswers) {
    //iterates over every element in loggedAnswers
    loggedAnswers.forEach((answer) => {

      //if this droppable-Element found it's answer
      if (answer.droppableZoneId === droppableId) {

        //it tests if it's answerId matches his own Id, then the anser is correct
        if (answer.answerId === answer.droppableZoneId) {
          setLocalAnswerState(1);
          
        } else {
          setLocalAnswerState(-1);
        }
      }
    });
  } 
  else if (isShowingResults===false) {
    //set color to gray
    setLocalAnswerState(0);
  }
}
