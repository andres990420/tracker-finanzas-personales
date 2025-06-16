import { FaPlus } from "react-icons/fa";
import TableMovements from "../components/Home/TableMovements";
import Button from "../components/UI/Button";
import FilterBar from "../components/UI/FiltersBar";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import TransactionForm from "../components/Home/TransactionsForm/TransactionForm";


export default function Home() {
  const [isModalActive, setIsModalActive] = useState(false)
  function cancelForm(){
    setIsModalActive(false)
  }
  function newTransaction(){
    setIsModalActive(true)
  }
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
            <Button color="blue" icon={<FaPlus />} onClick={newTransaction}>
              Nuevo Movimiento
            </Button>
            <FilterBar />
          </div>
          <TableMovements />
        </div>
        {/* TODO DASHBOARD AREA */}
      </div>
      <Modal isActive={isModalActive} setIsActive={setIsModalActive} title="Nueva Transaccion">
        <TransactionForm cancelForm={cancelForm}/>
      </Modal>
    </>
  );
}
