import type { ReactNode } from "react";
import Button, { Color } from "./Button.tsx";


interface ControlBarProps {
  children?: ReactNode
  testAnswers?: () => void
}

export default function ControlBar(props: ControlBarProps) {
  return (
    <div className="fixed bottom-2 left-0 right-0 rounded-4xl 
    mx-auto min-h-10 px-3 py-2.5 min-w-180 grid grid-cols-4 place-items-center">

      {props.children}
      <Button bgColor={Color.BLUE} onClick={props.testAnswers}>Neue Runde Starten</Button>
      <Button bgColor={Color.GREEN} onClick={props.testAnswers}>Anworten prüfen</Button>
      <Button bgColor={Color.YELLOW} onClick={props.testAnswers}>Lösungen anzeigen</Button>
      <p>Versuche: 3/ 4</p>
    </div>
  );
}
