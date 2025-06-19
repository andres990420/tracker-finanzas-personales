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
import { useAuth } from "../../auth/AuthProvider";
import Register from "../Login/Register";

export default function SideMenu() {
  const [isLoginModalActive, setIsLoginModalActive] = useState(false);
  const [isRegisterModalActive, setIsRegisterModalActive] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  function closeModal(modal: string) {
    if (modal === "login") {
      setIsLoginModalActive(false);
    } else {
      setIsRegisterModalActive(false);
    }
  }

  function switchModal(modalToActive: string) {
    if (modalToActive === "login") {
      setIsRegisterModalActive(false);
      setIsLoginModalActive(true);
    } else {
      setIsLoginModalActive(false);
      setIsRegisterModalActive(true);
    }
  }

  function logoutHandler() {
    logout();
    window.location.href = "/";
  }

  return (
    <>
      <div className="bg-gray-800 h-[100%] py-[20px] grid justify-between gap-4 w-[175px] ">
        
        {!isAuthenticated && (
          <>
            <div className="grid h-20 gap-5 self-center">
              <Button
                color="blue"
                icon={<FaUserAlt />}
                onClick={() => setIsLoginModalActive(true)}
              >
                Iniciar sesion
              </Button>
              <Button
                color="red"
                icon={<FaPencilAlt />}
                onClick={() => setIsRegisterModalActive(true)}
              >
                Registrarse
              </Button>
            </div>
            <Modal
              isActive={isLoginModalActive}
              setIsActive={setIsLoginModalActive}
              title={"Iniciar Sesion"}
            >
              <Login setModalActive={closeModal} switchModal={switchModal} />
            </Modal>
            <Modal
              isActive={isRegisterModalActive}
              setIsActive={setIsRegisterModalActive}
              title={"Registrar nuevo usuario"}
            >
              <Register setModalActive={closeModal} switchModal={switchModal} />
            </Modal>
          </>
        )}

        {isAuthenticated && (
          <>
            <div className="m-5 text-white text-center">
              <img
                className="rounded-full mx-auto h-25 ring-4 ring-blue-500"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgnzkK8eV-B4BXvljOPTfa1oQ3Kf7ih3AO1Q&s"
              ></img>
              <p className="mt-4">Usuario</p>
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
              <Button
                color="red"
                icon={<FaArrowAltCircleLeft />}
                onClick={logoutHandler}
              >
                Cerrar Sesion
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
