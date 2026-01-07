import { useEffect, useState } from "react";
import type { RoomModel } from "../generated/prisma/models/Room.ts";
import type { Route } from "../../.react-router/types/app/routes/+types/client.ts";
import NoRoomYet from "../components/client/NoRoomYet.tsx";
import prisma from "../lib/prisma.ts";
import RoomButNoId from "../components/client/RoomButNoId.tsx";
import type { UserModel } from "../generated/prisma/models.ts";
import { Form, redirect } from "react-router";
import Button, { Color } from "../components/Button.tsx";

export function meta({ }: Route.MetaArgs) {
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
  const formData: FormData = await request.formData();
  const intent = formData.get("intent");
  let hasAnswered: boolean = false;

  if (intent === "submitAnswer") {
    //submit answer code

    const answer = formData.get("userAnswer") as string || "";
    //Todo: überprüfen, ob der Nutzer bereits eine Antwort gesendet hat, durch Datenbank abfrage
    //wenn runde von host neu gestarete wird, werden alle alten gelöscht und es darf wieder gesendet werden
    const updatedUser = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        answer: answer,
      },
    });

    console.log("Anwort abgeschickt: " + updatedUser.answer + " von Nutzer: " + updatedUser.name);
    hasAnswered = true;
    return ({ isSend: hasAnswered })




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
    return redirect(`/client/${params.roomId}/${user?.id}`);
  }


}

export async function loader(props: Route.LoaderArgs) {
  let room: RoomModel | null = null;

  if (props.params.roomId) {
    room = await prisma.room.findUnique({
      where: {
        id: props.params.roomId,
      },
    });
  }

  return { props, room };
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const [roomObject, _setRoomObect] = useState(loaderData.room);
  const [hasAnswered, setHasAnswered] = useState(false);


  useEffect(() => {

    if (actionData && actionData.isSend) {
      setHasAnswered(actionData.isSend)

    }

    else {
      setHasAnswered(false)
    }


  }, [actionData])

  const roomIdParam = loaderData.props.params.roomId;
  const userId = loaderData.props.params.userId;


  const LobbyAndId = (
    <div className="m-20">
      "Gib dein Wort hier ein"
      <Form method="post">
        <input type="hidden" name="intent" value="submitAnswer"></input>
        <input
          className="bg-white border-2 m-5 border-amber-400 rounded-full text-black"
          type="text"
          name="userAnswer"
        />

        <Button bgColor={Color.GREEN} type="submit">Submit</Button>
      </Form>
    </div>
  );

  return (
    <div>
      {!roomIdParam
        ? <NoRoomYet />
        : ((roomIdParam && !userId)
          ? <RoomButNoId room={roomObject} />
          : (!hasAnswered ? LobbyAndId : " Danke für deine Anwort"))}
    </div>
  );
}

