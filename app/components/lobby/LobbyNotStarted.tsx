import { Form } from "react-router";
import Button, { Color } from "../Button.tsx";

export default function LobbyNotStarted() {
  const startHostingButton = (
    <Button
      bgColor={Color.GREEN}
      type="submit"
    >
      Spiel starten
    </Button>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <Form method="post">
        <input type="hidden" name="intent" value="startGame"></input>
        <div>
          {startHostingButton}
        </div>
      </Form>

      <div className="text-black mt-10 bg-blue-50 min-h-24 px-5 pt-5 pb-8 w-100 text-center rounded-4xl">
        <p>Erklärung:</p>
        <p>
          In diesem Spiel geht es darum, als Gruppe zuzuordnen, welche Antwort
          auf eine Frage, wohl von wem stammen mag oder wie jeder von euch auf
          eine bestimmte Situation reagieren würde usw. Die Möglichkeiten sind
          unbegrenzt. Denkt euch etwas aus und dann ratet los
        </p>
         <p>
          <br></br>
        </p>
        <p>
          Ihr braucht ein Gerät mit großem Bildschirm (z. B. ein Tablet oder
          einen Laptop). Auf diesem öffnet ihr diese Seite. Ihr startet das
          Spiel und scannt dann mit euren Smartphones den QR-Code. So gelangt
          ihr zu einer Seite, auf der ihr euren Namen und anschließend eure
          Antwort eingeben könnt. (Vorher überlegt ihr euch offline eine Frage,
          zu der jeder antwortet. Diese Frage braucht ihr hier nirgendwo
          einzugeben.)
        </p>
        <p>
          <br></br>
        </p>
        <p>
          Wenn ihr im Spiel seid, ordnet ihr per Drag & Drop die Antworten den
          jeweiligen Personen zu. Wenn ihr alle eingeloggt habt, könnt ihr
          euer Ergebnis überprüfen. Leuchten die Karten grün, habt ihr richtig
          entschieden. Leuchten sie rot, müsst ihr es noch einmal versuchen.
          Unten rechts seht ihr die Anzahl eurer Versuche. Setzt euch selbst
          ein Ziel, in wie vielen Versuchen ihr es schaffen wollt.
        </p>
         <p>
          <br></br>
        </p>

        <a className="text-blue-800" href="/host/game">Hier gibt es eine kleinen Demo</a>

      </div>
    </div >
  );
}
