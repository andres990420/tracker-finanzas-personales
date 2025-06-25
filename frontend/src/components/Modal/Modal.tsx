import { FaX } from "react-icons/fa6";
import type { ReactNode } from "react";

interface Promps {
  children: ReactNode;
  title?: string;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal(promps: Promps) {
  const { children, title, isActive, setIsActive } = promps;

  return (
    <>
      {isActive && (
        <div className="h-[100vh] w-[100vw] bg-black/30 fixed top-0 left-0 align-middle justify-center flex overflow-x-hidden">
          {/* Overlay */}
          <div className="w-150 border h-fit border-white/50 shadow-2xl rounded-3xl p-4 m-4 relative bg-white">
            {/* Contenedor */}
            {title && (
              <div className=" w-full h-15 border-b border-gray-200 p-5 text-2xl text-gray-800 font-bold">
                {/* Encabezado */}
                <h3>{title}</h3>
              </div>
            )}
            <button
              onClick={() => setIsActive(!isActive)}
              className="absolute hover:bg-gray-100 rounded-xl right-7 top-7 size-10 justify-items-center"
            >
              {/* Boton cerrar */}
              <FaX />
            </button>
            <div className="bg-amber-200/2 h-fit wrap-normal w-auto p-2 ">
              {/* Contenido */}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
