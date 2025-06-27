import type { ReactNode } from "react";

interface Promps {
  href?: string;
  children: ReactNode;
  icon?: ReactNode;
  isActive: Boolean;
}

export default function NavBarItems(promps: Promps) {
  const { icon, href, children, isActive } = promps;

  return (
    <a
      className={`p-2 h-auto w-auto flex gap-1 rounded-lg font-semibold ${
        isActive ? "bg-blue-500 text-white" : "hover:bg-blue-200"
      } `}
      href={href}
    >
      <i className="p-1">{icon}</i>
      {children}
    </a>
  );
}
