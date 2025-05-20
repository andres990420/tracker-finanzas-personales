import { FaPlus } from "react-icons/fa";
import TableMovements from "../components/Home/TableMovements";
import Button from "../components/UI/Button";
import FilterBar from "../components/UI/FiltersBar";
import Modal from "../components/Modal/Modal";
import Login from "../components/Login/Login";
import { useState } from "react";

export default function Home() {
  const [isModalActive, setIsModalActive] = useState(true);
  return (
    <>
      <div className=" m-3">
        <div className="justify-items-center font-bold">
          <h1 className="text-4xl text-gray-800">
            Tracker finanzas personales
          </h1>
        </div>
        <div className="justify-items-center">
          <div className="flex justify-between m-4">
            <Button color="blue" icon={<FaPlus />}>
              Nuevo Movimiento
            </Button>
            <FilterBar />
          </div>
          <TableMovements />
        </div>
        <Modal
          isActive={isModalActive}
          setIsActive={setIsModalActive}
          title="Inicio de sesion"
        >
          <Login registration={false} />
        </Modal>
        {/* TODO DASHBOARD AREA */}
      </div>
    </>
  );
}
