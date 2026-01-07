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
        <p>In diesem Spiel geht es darum, als Gruppe zuzuordnen, welche Antwort auf eine Frage, wohl von wem stammen mag
          oder wie jeder von euch auf eine bestimmte Situation reagieren würde usw. Die Möglichkeiten sind unbegrenzt. 
          Denkt euch etwas au und dann ratet los
        </p>
        <p>
          Ihr braucht ein Gerät mit großem Bildschirm (z.b. ein Tablet oder ein
          Laptop), auf dem öffnet ihr diese Seite. Ihr startet das Spiel und
          scannt dann mit euren Smartphones den QR-Code und gelangt dort zu
          einer Seite, wo ihr euren Namen und danach eure Antwort eingeben
          könnt. (Vorher überlegt ihr euch offline eine Frage, zu der jeder
          Antwortet. Diese Frage braucht ihr hier nirgendwo eingeben.)
          <p>
            <br></br>
          </p>
          <p>
            Wenn ihr dann im Spiel seid, ordnet ihr per Drag & Drop die
            Antworten gemeinsam den jeweiligen Personen zu. Wenn Ihr alles
            eingeloggt habt, könnt ihr euer Ergebnis überprüfen. Leuchten die
            Karten grün, habt ihr richtig entschieden, leuchten sie rot, müsst
            ihr es nochmal versuchen. Unten rechts, sehr ihr die Anzahl euer
            Versuche. Setzt euch selbst ein Ziel, in wie viel Versuchen ihr es
            schaffen wollt.
          </p>
        </p>
      </div>
    </div>
  );
}
