//bietet funktionen und variablen, die für den SPielstand zuständig sind

import { useEffect, useState } from "react";
import type { loggedAnswer } from "../../types/types.ts";
import type { UserModel } from "../../generated/prisma/models/User.ts";

export function useGameState(
  users: UserModel[],
  loggedAnswers: loggedAnswer[],
   setAllAnswersLoggedIn: React.Dispatch<React.SetStateAction<boolean>>

) {
  //sagt aus, ob alle Anworten eingeloggt und dann abgeschickt worden
  const [answersSubmitted, setAnswersSubmitted] = useState(false);

  useEffect(() => {
    if (loggedAnswers.length === users.length) {
      setAllAnswersLoggedIn(true)
    }

    else {
      setAllAnswersLoggedIn(false)
      setAnswersSubmitted(false)
    }
    
  }, [loggedAnswers]);

  //speicherrt die Versuche
  const [attempts, setAttempts] = useState(0);

  //wird ausgelöst, wenn "Antwort prüfen" gedrückt wurde
  function submitAnswers() {
    console.log("Antwort prüfen wurde gedrückt");
    if (loggedAnswers.length === users.length) {
      console.log("Alles eingeloggt");

      setAttempts((s) => s + 1);

      setAnswersSubmitted(true);

    } else {
      alert(`Du hast noch nicht alle Karten eingeloggt`);
      setAnswersSubmitted(false);
    }
  }

  return {
    answersSubmitted,
    setAnswersSubmitted,
    attempts,
    submitAnswers,
  };
}
