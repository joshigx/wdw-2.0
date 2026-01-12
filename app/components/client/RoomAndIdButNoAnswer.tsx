import { Form } from "react-router";
import Button, { Color } from "../general/Button.tsx";

export default function RoomAndId() {
  return (
    <div className="mt-10 grid place-items-center gap-4">
      Gib deine Antwort hier ein:
      <Form method="post" className="grid place-items-center gap-4">
        <input type="hidden" name="intent" value="submitAnswer"></input>
        <input
          className="rounded-full bg-white p-3 text-black"
          type="text"
          name="userAnswer"
        />

        <Button
          bgColor={Color.GREEN}
          onClick={() => (console.log("Ich wurde gedrückt"))}
          type="submit"
        >
          Antwort senden
        </Button>
      </Form>
    </div>
  );
}
