import type { RoomModel } from "../../../generated/prisma/models/Room.ts";
import type { UserModel } from "../../../generated/prisma/models/User.ts";
import prisma from "../../../lib/prisma.ts";

export default async function handleAnswerSubmit(
  formData: FormData,
  room: RoomModel | null,
  roomId: string,
  user: UserModel | null,
  userId: string,
): Promise<void> {
  //submit answer code

  const answer = formData.get("userAnswer") as string || "";
  //Todo: überprüfen, ob der Nutzer bereits eine Antwort gesendet hat, durch Datenbank abfrage
  //wenn runde von host neu gestarete wird, werden alle alten gelöscht und es darf wieder gesendet werden

  room = await prisma.room.findUnique(
    {
      where: {
        id: roomId,
      },
    },
  );

  user = await prisma.user.findUnique(
    {
      where: {
        id: userId,
      },
    },
  );

  console.log(
    "die antwort die gerade für diesen nutzer in der datenbank gespeichert ist: " +
      user?.answer,
  );

  if (user?.answer || room?.isRunning) {
    //Fehlerüberprufung einabuen: wenn das spiel gerade läuft oder der nutzer bereits seine antwort abgesendet hat
    console.log("Fehler antwort breits gesendet doer spiel läuft gerade");

    if (user?.answer) {
      //Du hast schon eine Antwort gesendet
    }

    if (room?.isRunning) {
      //Das Spiel läuft gerade noch
    }
  } else {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        answer: answer,
      },
    });

    console.log(
      "Anwort abgeschickt: " + updatedUser.answer + " von Nutzer: " +
        updatedUser.name,
    );
  }
}
