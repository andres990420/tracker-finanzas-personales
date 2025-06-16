import type { ReactNode } from "react";

interface Promps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  icon?: ReactNode;
}

export default function Button(promps: Promps) {
  const { color, icon } = promps;
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

  const style = `flex justify-center m-1 items-center min-w-fit min-h-fit p-1 gap-1 text-2xs rounded-xl shadow-xl text-white font-bold ${fondo} ${hover}`;
  return (
    <button className={style} {...promps}>
      <i className="p-1">{icon}</i>
      {promps.children && <p className="p-1">{promps.children}</p>}
      
    </button>
  );
}
