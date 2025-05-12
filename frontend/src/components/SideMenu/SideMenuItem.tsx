import type { ReactNode } from "react";

interface Promps {
  text: string;
  icon?: ReactNode
}

export default function SideMenuItem(promps: Promps) {
  const { text, icon } = promps;
  return (
    <li className="p-[10px] hover:bg-blue-500 truncate">
      <a className="text-center text-xl " href="#">
        <div className="flex gap-2 p-1">
          <span className="py-1">{icon}</span>
          {text}
        </div>
        
      </a>
    </li>
  );
}
