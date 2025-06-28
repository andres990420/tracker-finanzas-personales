import { FaPlus } from "react-icons/fa";
import MovementsTable from "../components/Home/MovementsTable/TableMovements";
import Button from "../components/UI/Button";
import FilterBar from "../components/UI/FiltersBar";
import { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import TransactionForm from "../components/Home/TransactionsForm/TransactionForm";
import type { IBudgets, ITransactions } from "../types/models";
import {
  deleteTransaction,
  fetchApiBudgets,
  fetchApiTransactions,
  sendTransactionsForm,
} from "../Service/api";
import Loader from "../components/UI/Loader";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router";
import Toast from "../components/UI/Toast";


export default function Transactions() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [transactions, setTransactions] = useState<ITransactions[]>();
  const [budgets, setBudgets] = useState<IBudgets[]>();
  const [loader, setLoader] = useState<boolean>(true);
  const [refreshPage, setRefreshPage] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [isToastActive, setIsToastActive] = useState<boolean>(false);

  const { isAuthenticated } = useAuth();

  const goTo = useNavigate();

  if (!isAuthenticated) {
    // goTo("/");
  }

  function closeToast() {
    setIsToastActive(false);
  }

  function cancelForm() {
    setIsModalActive(false);
  }
  function newTransaction() {
    setIsModalActive(true);
  }

  async function handleDeleteTransaction(
    transactionId: string,
    categoryId: string
  ) {
    try {
      const response = await deleteTransaction(transactionId, categoryId);
      if (response.ok) {
        setError(false);
        setToastMessage("Transaccion eliminada con exito");
        setIsToastActive(true);
      } else {
        setError(true);
        setToastMessage("Ha ocurrido un error al eliminar la transaccion");
        setIsToastActive(true);
      }
    } catch (error) {
      throw new Error(`Ha ocurrido un error: ${error}`);
    } finally {
      setRefreshPage(!refreshPage);
    }
  }

  async function handlerSubmitForm(
    e: any,
    transactionType: string,
    amount: string,
    category: string,
    description: string,
    date: string,
    categoryId?: string | null
  ) {
    e.preventDefault();
    try {
      const response = await sendTransactionsForm(
        transactionType,
        date,
        category,
        amount,
        description,
        categoryId
      );
      if (response.ok) {
        setError(false);
        setToastMessage("Transaccion Guardada con exito");
        setIsToastActive(true);
      } else {
        setError(true);
        setToastMessage("Ha ocurrido un error al guardar la transaccion");
        setIsToastActive(true);
      }
    } catch (error) {
      throw console.error(error);
    } finally {
      cancelForm();
      setRefreshPage(!refreshPage);
    }
  }

  async function getTransactions() {
    setLoader(true);
    try {
      const data = await fetchApiTransactions();

      setTransactions(data);
    } catch (error) {
      setError(true);
      setToastMessage("Ha ocurrido un error al recuperar las transacciones");
      setIsToastActive(true);
      throw console.error(error);
    } finally {
      setLoader(false);
    }
  }

  async function getBudgets() {
    try {
      const budgets = await fetchApiBudgets();
      setBudgets(budgets);
    } catch (error) {
      setError(true);
      setToastMessage("Ha ocurrido un error al recuperar los presupuestos");
      setIsToastActive(true);
      throw console.error(error);
    }
  }

  useEffect(() => {
    getTransactions();
    getBudgets();
  }, [refreshPage]);

  return (
    <>
      <div className="bg-gray-200 h-max">
        <div className="flex justify-between bg-gray-100 p-2 shadow-lg">
          <div className="flex">
            <div className="p-1">
              <h1 className="text-2xl font-bold">Movimientos</h1>
              <p className="text-sm font-light">
                Registro de ingreso y egresos
              </p>
            </div>
          </div>
          <div className="flex justify-items-center m-2 gap-2">
            <div className="place-content-center">
              <Button color="blue" icon={<FaPlus />} onClick={newTransaction}>
                Nuevo Movimiento
              </Button>
            </div>
            <div className="p-1 justify-center place-content-center">
              <FilterBar />
            </div>
          </div>
        </div>

        <div className="h-[77vh] overflow-y-scroll p-6">
          <Loader isActive={loader} />
          {transactions && (
            <MovementsTable
              transactions={transactions}
              budgets={budgets}
              handleDeleteTransaction={handleDeleteTransaction}
            />
          )}
        </div>
        {/* TODO DASHBOARD AREA */}
      </div>
      <Modal
        isActive={isModalActive}
        setIsActive={setIsModalActive}
        title="Nueva Transaccion"
      >
        <TransactionForm
          cancelForm={cancelForm}
          handlerSubmit={handlerSubmitForm}
        />
      </Modal>
      <Toast
        error={error}
        message={toastMessage}
        isActive={isToastActive}
        closeToast={closeToast}
        timeUp={5000}
      />
      
    </>
  );
}
