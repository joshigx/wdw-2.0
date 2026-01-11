import type { Route } from "../../../.react-router/types/app/routes/game/+types/game.ts";
import { ClientOnly } from "../../components/ClientOnly.tsx";
import ControlBar from "../../components/ControlBar.tsx";
import type { UserModel } from "../../generated/prisma/models/User.ts";
import { useDragAndDrop } from "./useDragAndDrop.ts";
import { useGameState } from "./useGameState.ts";
import GameBoard from "../../components/GameBoard.tsx";
import { useState } from "react";

//Loader ausgelagtert
export { loader } from "./loader.ts";
export { action } from "./action.ts";
export { meta } from "./meta.ts";

export default function Game({ loaderData }: Route.ComponentProps) {
  //States

  const [allAnswersLoggedIn, setAllAnswersLoggedIn] = useState(false);



  //identifier-Declaration
  const users: UserModel[] = loaderData;
  const dnd = useDragAndDrop(users);
  const game = useGameState(users, dnd.loggedAnswers, setAllAnswersLoggedIn);
  

  return (
    <div className="">
      <ClientOnly>
        <GameBoard
          dnd={dnd}
          users={users}
          answersSubmitted={game.answersSubmitted}
          allAnswersLoggedIn={allAnswersLoggedIn}
        >
        </GameBoard>
        <ControlBar
          testAnswers={game.submitAnswers}
          attempts={game.attempts}
        >
        </ControlBar>
      </ClientOnly>
    </div>
  );
}
