import type { ReactNode } from "react";

interface Props {
  text?: string;
  color: string;
  icon?: ReactNode;
  onclick?: () => void;
}

export default function Buttons(props: Props) {
  const { text, color, icon, onclick } = props;
  let fondo, hover;
  switch (color) {
    case "red":
      fondo = "bg-red-600";
      hover = "hover:bg-red-500";
      break;
    case "blue":
      fondo = "bg-blue-600";
      hover = "hover:bg-blue-500";
      break;
    case "violet":
      fondo = "bg-violet-600";
      hover = "hover:bg-violet-500";
      break;
  }

  const style = `flex border border-zinc-800  rounded shadow-2xs font-bold text-white m-2 ${fondo} ${hover}`;
  return (
    <button className={style} onClick={onclick}>
      <span className="m-2 h-3 w-4">{icon && icon}</span>
      {text && <span className="m-1">{text}</span>}
    </button>
  );
}
