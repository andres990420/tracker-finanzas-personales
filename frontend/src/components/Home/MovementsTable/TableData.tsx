import type { ReactNode } from "react";

interface Promps {
  children: ReactNode;
  id: string
}

export default function TableData(promps: Promps) {
  const {id, children}=promps
    return (
    <td key={`${id}category"`} className="p-2 w-1/5 max-w-10">
      {children}
    </td>
  );
}
