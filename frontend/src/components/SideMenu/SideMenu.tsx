import { FaArrowAltCircleLeft, FaFlagCheckered, FaHome } from "react-icons/fa";
import Buttons from "../Buttons";
import SideMenuItem from "./SideMenuItem";
import { FaGear, FaMoneyBill } from "react-icons/fa6";

export default function SideMenu() {
  return (
    <>
      <div className="bg-gray-800 h-[100%] py-[20px] grid justify-between gap-4">
        <div className="m-5 text-white text-center">
          <img
            className="rounded-full mx-auto h-25 ring-4 ring-blue-500"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgnzkK8eV-B4BXvljOPTfa1oQ3Kf7ih3AO1Q&s"
          ></img>
          <p className="mt-4">Usuario</p>
        </div>
        <ul className="py-[10px] text-center text-white font-bold">
          <SideMenuItem text="Inicio" icon={<FaHome />} href="/"/>
          <SideMenuItem text="Presupuesto" icon={<FaMoneyBill/>} href="/budgets"/>
          <SideMenuItem text="Metas Financieras" icon={<FaFlagCheckered/>} href="/goals"/>
        </ul>
        <div className="grid h-20">
          <Buttons text="Configuraciones" color="violet" icon={<FaGear />} />
          <Buttons
            text="Cerrar Sesion"
            color="red"
            icon={<FaArrowAltCircleLeft />}
          />
        </div>
      </div>
    </>
  );
}
