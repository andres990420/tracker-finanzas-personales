import { FaBan, FaCheckCircle } from "react-icons/fa";
import Button from "../../UI/Button";
import { useState, useEffect } from "react";
import SwitchButton from "../../UI/SwitchButton";
import TransactionFormBudgetsAndCategories from "./TransactionFormBudgetsAndCategories";
import type { IBudgets } from "../../../types/models";
import { fetchApiBudgets, sendTransactionsForm } from "../../../Service/api";

interface Promps {
  cancelForm: () => void;
}

export default function TransactionForm(promps: Promps) {
  const { cancelForm } = promps;

  const [haveBudget, setHaveBudget] = useState(false);
  const [budgets, setBudgets] = useState<IBudgets[]>();

  const [transactionType, setTransactionType] = useState<string>("");
  const [amount, setAmount] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();
  const [date, setDate] = useState<string>();

  function activeBudget() {
    setHaveBudget(!haveBudget);
  }

  async function recoverBudgets() {
    try {
      const data = await fetchApiBudgets();
      setBudgets(data);
    } catch (error) {
      throw console.error(error);
    }
  }

  useEffect(() => {
    recoverBudgets();
  }, []);

  function selectTypeTransaction(e: any) {
    if (e.target.value === "Expensive") {
      setTransactionType("Expensive");
    } else if (e.target.value === "Income") {
      setTransactionType("Income");
    }
  }

  async function handlerSubmit(e: any) {
    e.preventDefault();
    console.log(
      JSON.stringify({
        type: transactionType,
        date: date,
        category: category,
        amount: amount,
        description: description,
        categoryId: categoryId,
      })
    );
    try {
      sendTransactionsForm(
        transactionType,
        date,
        category,
        amount,
        description,
        categoryId
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form method="POST" className="m-1" onSubmit={handlerSubmit}>
      <div className="grid gap-2 p-1 m-1">
        <label className="font-bold text-xl">Tipo de transaccion</label>
        <select
          required
          name="type"
          id="select-type-transaction"
          className={`border font-bold rounded-2xl p-1 text-center ${
            transactionType === "income"
              ? "bg-green-200/40 text-green-800 border-green-600"
              : transactionType === "expensive"
              ? "bg-red-200/50 text-red-800 border-red-600"
              : "bg-white"
          }`}
          onChange={(e) => selectTypeTransaction(e)}
        >
          <option className="bg-white" disabled value={""} selected>
            Selecciona el tipo de transaccion
          </option>
          <option
            className="bg-green-600/40 text-green-800 selection:bg-blue-20"
            value={"Income"}
          >
            Ingreso
          </option>
          <option className="bg-red-400/50 text-red-800" value={"Expensive"}>
            Gasto
          </option>
        </select>

        <div className={transactionType !== "" ? " grid gap-2 p-1" : "hidden"}>
          <label className="font-bold text-xl p-1">
            Fecha de la transaccion
          </label>
          <input
            type="date"
            name="date"
            className="border border-gray-800 rounded-2xl p-1 text-center"
            required
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <label className="font-bold text-xl p-1">Monto</label>
          <input
            required
            name="amount"
            type="number"
            className="border border-gray-800 rounded-2xl p-1 text-center"
            placeholder="Ingrese el monto de la transaccion"
            onChange={(e) => setAmount(e.target.value)}
          ></input>
          <label className="font-bold text-xl p-1">Categoria</label>
          <select
            required
            className="border border-gray-800 rounded-2xl p-1 text-center"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {transactionType === "Income" ? (
              <>
                <option>Categorias de ingresos</option>
                <option value={"option 1"}>1</option>
              </>
            ) : transactionType === "Expensive" ? (
              <>
                <option>Categoria de gastos</option>
                <option value={"option 1"}>1</option>
              </>
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
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {budgets && (
            <div className={`flex justify-between m-1 p-1`}>
              <label className="font-bold text-lg p-1 text-blue-500">
                Agregar a un presupuesto?
              </label>
              <SwitchButton
                eventTrigger={activeBudget}
                activeState={haveBudget}
                setActiveState={setHaveBudget}
              />
            </div>
          )}
          {haveBudget && budgets && (
            <TransactionFormBudgetsAndCategories
              budgets={budgets}
              setCategoryId={setCategoryId}
            />
          )}
        </div>
      </div>

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
