import { type ReactNode } from "react";

export enum Color {
  GREEN = "green",
  BLUE = "blue",
  RED = "red",
  WHITE = "white",
  YELLOW = "yellow",
}

const colorClasses: Record<Color, string> = {
  [Color.GREEN]: "bg-green-700 hover:bg-green-800 active:bg-green-900",
  [Color.BLUE]: "bg-blue-700 hover:bg-blue-800 active:bg-blue-900",
  [Color.RED]: "bg-red-700 hover:bg-red-800 active:bg-red-900",
  [Color.WHITE]: "bg-white hover:bg-gray-100 text-gray-900 active:bg-gray-200",
  [Color.YELLOW]: "bg-yellow-600 hover:bg-yellow-800 active:bg-yellow-900",
};

interface ButtonProps {
  children?: ReactNode;
  bgColor: Color;
  isDisabled?: boolean;
  onClick?: () => void;
  type: "submit" | "reset" | "button" | undefined;
}
export default function Button(props: ButtonProps) {
  return (
    <button
      disabled={false}
      type={props.type}
      className={`
        text-white
        ${colorClasses[props.bgColor]}
        box-border rounded-full border border-transparent px-4 py-2.5 text-sm
        leading-5 font-medium
      `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
