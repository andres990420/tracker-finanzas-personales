import { FaHome } from "react-icons/fa";
import NavBarItems from "./NavBarItems";
import { FaMoneyBills } from "react-icons/fa6";

export default function NavBar() {
  return (
    <nav className="flex gap-2 p-1 justify-center items-center text-black">
      <NavBarItems
        icon={<FaHome />}
        href="/"
        isActive={window.location.pathname === "/"}
      >
        Inicio
      </NavBarItems>
      <NavBarItems
        icon={<FaMoneyBills />}
        href="/transactions"
        isActive={window.location.pathname === "/transactions"}
      >
        Movimientos
      </NavBarItems>
      <NavBarItems
        icon={<FaMoneyBills />}
        href="/budgets"
        isActive={window.location.pathname === "/budgets"}
      >
        Presupuestos
      </NavBarItems>
    </nav>
  );
}
