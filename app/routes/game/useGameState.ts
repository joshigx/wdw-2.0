//bietet funktionen und variablen, die für den SPielstand zuständig sind

import { useEffect, useState } from "react";
import type { loggedAnswer } from "../../types/types.ts";
import type { UserModel } from "../../generated/prisma/models/User.ts";

export function useGameState(
  users: UserModel[],
  loggedAnswers: loggedAnswer[],
) {
  //sagt aus, ob alle Anworten eingeloggt und dann abgeschickt worden
  const [showResults, setShowResults] = useState(false);
  const [allAnswersLoggedIn, setAllAnswersLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedAnswers.length === users.length) {
      setAllAnswersLoggedIn(true);

    } else {

      setAllAnswersLoggedIn(false);

      setShowResults(false);
      
    }
  }, [loggedAnswers]);

  //speicherrt die Versuche
  const [attempts, setAttempts] = useState(0);

  //wird ausgelöst, wenn "Antwort prüfen" gedrückt wurde
  function submitAnswers() {
    console.log("Antwort prüfen wurde gedrückt");
    if (allAnswersLoggedIn) {
      console.log("Alles eingeloggt");

      setAttempts((s) => s + 1);

      setShowResults(true);
    } else {
      alert(`Du hast noch nicht alle Karten eingeloggt`);
      setShowResults(false);
    }
  }

  return {
    showResults: showResults,
    setShowResults: setShowResults,
    attempts: attempts,
    submitAnswers: submitAnswers,
  };
}
