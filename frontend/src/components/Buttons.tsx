import type { ReactNode } from "react";

interface Props {
  text: string;
  color: string;
  icon?: ReactNode;
}

export default function Buttons(props: Props) {
  const { text, color, icon } = props;
  let fondo, hover;
  switch (color) {
    case "red":
      fondo = "bg-red-600";
      hover = "hover:bg-red-500"
      break;
    case "blue":
      fondo = "bg-blue-600";
      hover = "hover:bg-blue-500"
      break;
    case "violet":
      fondo = "bg-violet-600";
      hover = "hover:bg-violet-500"
      break;
  }

  const style = `flex border border-zinc-800 p-2 rounded shadow-2xs font-bold text-white m-2 ${fondo} ${hover}`;
  return (
    <button className={style}>
      <span className="p-1 h-[12px]">{icon && icon}</span>
      {text}
    </button>
  );
}
