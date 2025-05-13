import type { ReactNode } from "react";
import { useState } from "react";


interface Promps {
  href?: string;
  text: string;
  icon?: ReactNode;
}

export default function SideMenuItem(promps: Promps) {
  const { text, icon, href } = promps;
  const [select, setSelect] = useState(false);

  function handdleClick(){
    setSelect(true)
  }
  return (
    <li className={`p-[10px] hover:bg-blue-500 truncate ${select && '[.active]'} `} onClick={handdleClick}>
      <a className="text-center text-xl " href={href}>
        <div className="flex gap-2 p-1">
          <span className="py-1">{icon}</span>
          {text}
        </div>
      </a>
    </li>
  );
}
