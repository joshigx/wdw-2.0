import { useEffect, useState } from "react";
import type { RoomModel } from "../generated/prisma/models/Room.ts";
import type { Route } from "../../.react-router/types/app/routes/+types/client.ts";
import NoRoomYet from "../components/client/NoRoomYet.tsx";
import prisma from "../lib/prisma.ts";
import RoomButNoId from "../components/client/RoomButNoId.tsx";
import type { UserModel } from "../generated/prisma/models.ts";
import { Form, redirect } from "react-router";
import Button, { Color } from "../components/Button.tsx";
import { PATH } from "../config/URLS.ts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({
  request,
  params,
}: Route.ActionArgs) {
  let user: UserModel | null = null;
  let room: RoomModel | null = null;
  const formData: FormData = await request.formData();
  const intent = formData.get("intent");
  let hasAnsweredSuccesful: boolean = false;

  if (intent === "submitAnswer") {
    //submit answer code

    const answer = formData.get("userAnswer") as string || "";
    //Todo: überprüfen, ob der Nutzer bereits eine Antwort gesendet hat, durch Datenbank abfrage
    //wenn runde von host neu gestarete wird, werden alle alten gelöscht und es darf wieder gesendet werden

    room = await prisma.room.findUnique(
      {
        where: {
          id: params.roomId,
        },
      },
    );

    user = await prisma.user.findUnique(
      {
        where: {
          id: params.userId,
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
          id: params.userId,
        },
        data: {
          answer: answer,
        },
      });

      console.log(
        "Anwort abgeschickt: " + updatedUser.answer + " von Nutzer: " +
          updatedUser.name,
      );
      hasAnsweredSuccesful = true;
      return ({ hasAnsweredSuccesful });
    }
  } else if (intent === "submitUserName") {
    //submit username code
    const name = formData.get("userName") as string || "";

    //eventuell noch sicherheitsabfrage, dass roomId wirklich gülitg ist, obwohl es das sein müsste
    if (name && params.roomId!) {
      user = await prisma.user.create({
        data: {
          name: name,
          locationId: params.roomId!,
        },
      });
    }

    console.log("User angelegt: " + user);
    return redirect(`/${PATH.CLIENT}/${params.roomId}/${user?.id}`);
  }
}

export async function loader(props: Route.LoaderArgs) {
  let room: RoomModel | null = null;
  let user: UserModel | null = null;

  if (props.params.roomId) {
    room = await prisma.room.findUnique({
      where: {
        id: props.params.roomId,
      },
    });
  }

  if (props.params.userId) {
    user = await prisma.user.findUnique(
      {
        where: {
          id: props.params.userId,
        },
      },
    );
  }

  return { props, room, user };
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const [roomObject, _setRoomObect] = useState(loaderData.room);
  const [hasAnswered, setHasAnswered] = useState(!!loaderData.user?.answer);

  useEffect(() => {
    if (actionData && actionData.hasAnsweredSuccesful) {
      setHasAnswered(actionData.hasAnsweredSuccesful);
    }
  }, [actionData]);

  const roomIdParam = loaderData.props.params.roomId;
  const userId = loaderData.props.params.userId;

  const LobbyAndId = (
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

  return (
    <div>
      {!roomIdParam
        ? <NoRoomYet />
        : ((roomIdParam && !userId)
          ? <RoomButNoId room={roomObject} />
          : (!hasAnswered
            ? LobbyAndId
            : (
              <div className="m-5 mt-10 grid place-items-center">
                <p>
                  Lade diese Seite neu, wenn ihr mit der Runde fertig seid, dann
                  kannst du eine neue Antwort eingeben
                </p>
                <p>Du darfst deinen Bildschirm auch ausschalten.</p>
                <p>Deine aktuelle Antwort ist: {loaderData.user?.answer}</p>
              </div>
            )))}
    </div>
  );
}
