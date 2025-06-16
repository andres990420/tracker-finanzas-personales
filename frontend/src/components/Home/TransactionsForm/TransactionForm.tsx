import { FaBan, FaCheckCircle } from "react-icons/fa";
import Button from "../../UI/Button";
import { useState } from "react";
import SwitchButton from "../../UI/SwitchButton";
import TransactionFormBudgetsAndCategories from "./TransactionFormBudgetsAndCategories";

interface Promps {
  cancelForm: () => void;
}

export default function TransactionForm(promps: Promps) {
  const { cancelForm } = promps;

  const [isInBudget, setIsInBudget] = useState(false);
  const [transactiontype, setTransactionType] = useState(" ");
  function activeBudget() {
    setIsInBudget(!isInBudget);
  }
  function selectTypeTransaction() {
    const select = document.getElementById(
      "select-type-transaction"
    ) as HTMLSelectElement;
    console.log(select.selectedOptions[0].value);
    if (select.selectedIndex === 2) {
      setTransactionType("expensive");
    } else if (select.selectedIndex === 1) {
      setTransactionType("income");
    }
  }

  return (
    <form method="POST" className="m-1">
      <div className="grid gap-2 p-1 m-1">
        <label className="font-bold text-xl">Tipo de transaccion</label>
        <select
          required
          name="type"
          id="select-type-transaction"
          className={`border font-bold rounded-2xl p-1 text-center ${
            transactiontype === "income"
              ? "bg-green-200/40 text-green-800 border-green-600"
              : transactiontype === "expensive"
              ? "bg-red-200/50 text-red-800 border-red-600"
              : "bg-white"
          }`}
          onChange={() => selectTypeTransaction()}
        >
          <option className="bg-white" disabled value={""} selected>
            Selecciona el tipo de transaccion
          </option>
          <option
            className="bg-green-600/40 text-green-800 selection:bg-blue-20"
            value={"income"}
          >
            Ingreso
          </option>
          <option className="bg-red-400/50 text-red-800" value={"expensive"}>
            Gasto
          </option>
        </select>
        
        <div className={transactiontype !== " " ? " grid gap-2 p-1" : "hidden"}>
          <label className="font-bold text-xl p-1">Fecha de la transaccion</label>
          <input type="date" name="date" className="border border-gray-800 rounded-2xl p-1 text-center"></input>
          <label className="font-bold text-xl p-1">Monto</label>
          <input
            required
            inputMode="numeric"
            name="amount"
            type="number"
            className="border border-gray-800 rounded-2xl p-1 text-center"
            placeholder="Ingrese el monto de la transaccion"
          ></input>
          <label className="font-bold text-xl p-1">Categoria</label>
          <select
            required
            className="border border-gray-800 rounded-2xl p-1 text-center"
            name="category"
          >
            {transactiontype === "income" ? (
              <option>Categorias de ingresos</option>
            ) : transactiontype === "expensive" ? (
              <option>Categoria de gastos</option>
            ) : (
              <option>Seleccione el tipo de transaccion</option>
            )}
          </select>

          <label className="font-bold text-xl p-1">
            Descripcion de la transacion
          </label>
          <textarea
            name="description"
            className="border border-gray-800 rounded-xl p-2 h-25"
            maxLength={150}
          ></textarea>
          <div className={`flex justify-between m-1 p-1`}>
            <label className="font-bold text-lg p-1 text-blue-500">
              Agregar a un presupuesto?
            </label>
            <SwitchButton
              eventTrigger={activeBudget}
              activeState={isInBudget}
              setActiveState={setIsInBudget}
            />
          </div>
        </div>
      </div>
      {isInBudget && <TransactionFormBudgetsAndCategories />}
      <div className="flex justify-center">
        <Button color="violet" type="submit" icon={<FaCheckCircle />}>
          Guardar
        </Button>
        <Button color="red" type="button" onClick={cancelForm} icon={<FaBan />}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
