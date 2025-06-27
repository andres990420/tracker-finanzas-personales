import type { ReactNode } from "react";

type IconColor = "black" | "white";
type ButtonColor = "red" | "blue" | "violet"

interface Promps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  icon?: ReactNode;
  transparent?: boolean;
  iconcolor?: IconColor;
}

export default function Button(promps: Promps) {
  const {
    color,
    icon,
    transparent = false,
    iconcolor: iconColor = "white",
  } = promps;
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

  const iconStyleColor = iconColor === "black" ? "text-black" : "text-white";

  const style = `flex justify-center m-1 items-center min-w-fit min-h-fit p-1 gap-1 text-2xs rounded-xl  text-white font-bold 
  ${!transparent && fondo} ${!transparent && hover} ${
    !transparent && "shadow-xl"
  }`;
  return (
    <button className={style} {...promps}>
      {icon && <i className={`p-1 ${iconStyleColor}`}>{icon}</i>}
      {promps.children && <p className="p-1">{promps.children}</p>}
    </button>
  );
}
