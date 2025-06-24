import { FaPlus } from "react-icons/fa";
import TableMovements from "../components/Home/TableMovements";
import Button from "../components/UI/Button";
import FilterBar from "../components/UI/FiltersBar";
import { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import TransactionForm from "../components/Home/TransactionsForm/TransactionForm";
import type { IBudgets, ITransactions } from "../types/models";
import { deleteTransaction, fetchApiBudgets, fetchApiTransactions } from "../Service/api";
import Loader from "../components/UI/Loader";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router";

export default function Home() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [transactions, setTransactions] = useState<ITransactions[]>();
  const [budgets, setBudgets] = useState<IBudgets[]>();
  const [loader, setLoader] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  const goTo = useNavigate();

  if (!isAuthenticated) {
    // goTo("/");
  }

  function cancelForm() {
    setIsModalActive(false);
  }
  function newTransaction() {
    setIsModalActive(true);
  }

  async function handleDeleteTransaction(transactionId: string, categoryId: string) {
    try {
      await deleteTransaction(transactionId, categoryId);
    } catch (error) {
      throw new Error(`Ha ocurrido un error: ${error}`);
    }
  }

  async function getTransactions() {
    setLoader(true);
    try {
      const data = await fetchApiTransactions();
      const budgets = await fetchApiBudgets();
      setTransactions(data);
      setBudgets(budgets);
    } catch (error) {
      throw console.error(error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

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
          {transactions && budgets && (
            <TableMovements
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
        <TransactionForm cancelForm={cancelForm} />
      </Modal>
      <Loader isActive={loader} />
    </>
  );
}
