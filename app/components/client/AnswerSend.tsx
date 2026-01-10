import type { UserModel } from "../../generated/prisma/models/User.ts";

export default function AnswerSend({ user }: { user: UserModel }) {
  return (
    <div>
      <div className="m-5 mt-10 grid place-items-center">
        <p>
          Lade diese Seite neu, wenn ihr mit der Runde fertig seid, dann kannst
          du eine neue Antwort eingeben
        </p>
        <p>Du darfst deinen Bildschirm auch ausschalten.</p>
        <p>Deine aktuelle Antwort ist: {user?.answer}</p>
      </div>
    </div>
  );
}
