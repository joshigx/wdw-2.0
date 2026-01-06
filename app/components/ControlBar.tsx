import { type ReactNode } from "react";
import Button, { Color } from "./Button.tsx";

interface ControlBarProps {
  children?: ReactNode;
  testAnswers?: () => void;
  restartGame?: () => void;
  showAnswers?: () => void;
  attempts: number;
}

export default function ControlBar(props: ControlBarProps) {
  return (
    <div className="fixed bottom-2 left-0 right-0 rounded-4xl 
    mx-auto min-h-10 px-3 py-2.5 min-w-180 grid grid-cols-4 place-items-center">
      {props.children}
      <Button type="button" bgColor={Color.BLUE} onClick={props.restartGame}>
        Neue Runde Starten
      </Button>
      <Button type="button" bgColor={Color.GREEN} onClick={props.testAnswers}>
        Anworten prüfen
      </Button>
      <Button type="button" bgColor={Color.YELLOW} onClick={props.showAnswers}>
        Lösungen anzeigen
      </Button>
      <p>
        {(props.attempts <= 2)
          ? `Du hast noch ${(4 - props.attempts)} Versuch`
          : ((props.attempts === 3)
            ? `Du hast noch einen Versuch`
            : `Ihr habt verloren`)}
      </p>
    </div>
  );
}
