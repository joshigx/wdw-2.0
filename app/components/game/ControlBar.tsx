import { type ReactNode } from "react";
import Button, { Color } from "../general/Button.tsx";
import { Form } from "react-router";

interface ControlBarProps {
  children?: ReactNode;
  testAnswers?: () => void;
  restartGame?: () => void;
  showAnswers?: () => void;
  attempts: number;
}

export default function ControlBar(props: ControlBarProps) {
  return (
    <div
      className={`
        fixed right-0 bottom-2 left-0 mx-auto grid min-h-10 min-w-180
        grid-cols-3 place-items-center rounded-4xl px-3 py-2.5
      `}
    >
      {props.children}
      <Form method="post">
        <input type="hidden" name="intent" value="startNewRound" />
        <Button type="submit" bgColor={Color.BLUE}>
          Neue Runde Starten
        </Button>
      </Form>
      <Button type="button" bgColor={Color.GREEN} onClick={props.testAnswers}>
        Anworten prüfen
      </Button>
      <p>
        Ihr habt bisher {props.attempts}{" "}
        {(props.attempts === 1) ? "Versuch" : "Versuche"} gebraucht
      </p>
    </div>
  );
}
