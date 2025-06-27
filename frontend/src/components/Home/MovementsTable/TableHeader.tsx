import type { ReactNode } from "react";

interface Promps{
    children : ReactNode
}

export default function TableHeader(promps: Promps) {
    const {children}=promps
    return (
    <th className="p-2 w-1/5">
      <p className="flex justify-center p-2">
        {children}
      </p>
    </th>
  );
}
