import Button from "../UI/Button";
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import { useAuth } from "../../auth/AuthProvider";
import Register from "../Login/Register";
import ProfilePhoto from "./ProfilePhoto";
import NavBar from "./NavBar";

export default function SideMenu() {
  const [isLoginModalActive, setIsLoginModalActive] = useState<boolean>(false);
  const [isRegisterModalActive, setIsRegisterModalActive] =
    useState<boolean>(false);
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
      <div className="bg-gray-100 border-b-gray-300 border-b top-0 gap-4 w-[100%] fixed h-[75px] flex justify-between p-2 max-w-screen ">
        <div className=" flex h-auto p-1 gap-5">
          {isAuthenticated && <ProfilePhoto />}
          <div>
            <h1 className="text-2xl font-bold">Finanzas Personales</h1>
            {isAuthenticated && <p className="text-md">Usuario</p>}
          </div>
        </div>
        <div className="flex p-2 gap-5">
          {isAuthenticated && <NavBar />}
          <div className="flex  justify-center items-center gap-2">
            {!isAuthenticated && (
              <>
                <Button
                  color="blue"
                  onClick={() => setIsLoginModalActive(true)}
                >
                  Iniciar sesion
                </Button>
                <Button
                  color="red"
                  onClick={() => setIsRegisterModalActive(true)}
                >
                  Registrarse
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button color="violet" icon={<FaGear />} />
                <Button
                  color="red"
                  icon={<FaArrowRightFromBracket />}
                  onClick={logoutHandler}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        isActive={isLoginModalActive}
        title="Inicio de sesion"
        setIsActive={() => closeModal("login")}
      >
        <Login switchModal={switchModal} setModalActive={closeModal} />
      </Modal>
      <Modal
        isActive={isRegisterModalActive}
        title="Registro"
        setIsActive={() => closeModal("register")}
      >
        <Register switchModal={switchModal} setModalActive={closeModal} />
      </Modal>
    </>
  );
}
