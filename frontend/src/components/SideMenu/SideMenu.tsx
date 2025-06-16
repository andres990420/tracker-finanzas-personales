import {
  FaArrowAltCircleLeft,
  FaHome,
  FaPencilAlt,
  FaUserAlt,
} from "react-icons/fa";
import Button from "../UI/Button";
import SideMenuItem from "./SideMenuItem";
import { FaGear, FaMoneyBill } from "react-icons/fa6";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";

export default function SideMenu() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  function modalConfig(activeRegistration: boolean) {
    console.log(activeRegistration);
    if (activeRegistration) {
      setIsModalActive(true);
      setModalTitle("Registrar nuevo usuario");
      setIsRegistration(true);
    } else {
      setIsModalActive(true);
      setModalTitle("Iniciar Sesion");
      setIsRegistration(false);
    }
  }

  return (
    <>
      <div className="bg-gray-800 h-[100%] py-[20px] grid justify-between gap-4 w-[175px] ">
        <div className="m-5 text-white text-center">
          <img
            className="rounded-full mx-auto h-25 ring-4 ring-blue-500"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgnzkK8eV-B4BXvljOPTfa1oQ3Kf7ih3AO1Q&s"
          ></img>
          <p className="mt-4">Usuario</p>
        </div>
        <div className="grid h-20 gap-5 self-center">
          <Button
            color="blue"
            icon={<FaUserAlt />}
            onClick={() => modalConfig(false)}
          >
            Iniciar sesion
          </Button>
          <Button
            color="red"
            icon={<FaPencilAlt />}
            onClick={() => modalConfig(true)}
          >
            Registrarse
          </Button>
        </div>
        <ul className="py-[10px] text-center text-white font-bold ">
          <SideMenuItem text="Inicio" icon={<FaHome />} href="/" />
          <SideMenuItem
            text="Presupuesto"
            icon={<FaMoneyBill />}
            href="/budgets"
          />
        </ul>
        <div className="grid gap-2 self-center">
          <Button color="violet" icon={<FaGear />}>
            Configuraciones
          </Button>
          <Button color="red" icon={<FaArrowAltCircleLeft />}>
            <a href="http://localhost:4000/user/logout">Cerrar Sesion</a>
          </Button>
        </div>
      </div>
      <Modal
        isActive={isModalActive}
        setIsActive={setIsModalActive}
        title={modalTitle}
      >
        <Login registration={isRegistration} />
      </Modal>
    </>
  );
}
