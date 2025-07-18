import { useEffect, useState, type ReactNode } from "react";
import BudgetForm from "../components/Budgets/BudgetForm/BudgetForm";
import BudgetsTable from "../components/Budgets/BudgetsTable/BudgetsTable";
import Button from "../components/UI/Button";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../components/Modal/Modal";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router";
import { type ITransaction, type IBudget } from "../types/models";
import {
  deleteBudget,
  fetchApiBudgets,
  fetchApiTransactions,
  sendBudgetForm,
  updateStatusBudget,
} from "../Service/api";
import Loader from "../components/UI/Loader";
import { Tooltip } from "react-tooltip";
import Toast from "../components/UI/Toast";

export default function Budgets() {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [budgets, setBudgets] = useState(Array<IBudget>);
  const [loader, setLoader] = useState<boolean>(true);
  const [refresPage, setRefreshPage] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string>();
  const [isToastActive, setIsToastActive] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [activesBudgets, setActivesBudgets] = useState<boolean>(true);
  const [budgetToEdit, setBudgetToEdit] = useState<IBudget>();

  const { isAuthenticated } = useAuth();
  const goTo = useNavigate();

  if (!isAuthenticated) {
    // goTo("/");
  }

  function closeForm() {
    setIsModalActive(!isModalActive);
  }

  function closeToast() {
    setIsToastActive(!isToastActive);
  }

  function newBudget() {
    setBudgetToEdit(undefined);
    setIsModalActive(true);
  }

  function handleEditBudget(id: string) {
    const budget = budgets.find((budget) => budget.id === id);
    setBudgetToEdit(budget);
    setIsModalActive(true);
  }

  async function handleArchiveBudget(budgetId: string, budgetStatus: boolean){
    try{
      const response = await updateStatusBudget(budgetId, budgetStatus)
      if (response.ok) {
        setError(false);
        setToastMessage(budgetStatus === false ? "Presupuesto archivado con exito" : "Presupuesto activado con exito");
        setIsToastActive(true);
      } else {
        setError(true);
        setToastMessage("Ha ocurrido un error al archivar el Presupuesto");
        setIsToastActive(true);
      }
    }catch(error){
      throw console.error(error);
    } finally {
      setRefreshPage(!refresPage);
    }
  }

  async function handleDeleteBudget(budgetId: string) {
    try {
      const response = await deleteBudget(budgetId);
      if (response.ok) {
        setError(false);
        setToastMessage("Presupuesto eliminado con exito");
        setIsToastActive(true);
      } else {
        setError(true);
        setToastMessage("Ha ocurrido un error al eliminar el Presupuesto");
        setIsToastActive(true);
      }
    } catch (error) {
      throw console.error(error);
    } finally {
      setRefreshPage(!refresPage);
    }
  }

  async function handleFormSubmit(
    e: React.FormEvent,
    budgetName: string,
    categoryType: string[],
    categoryLimit: string[],
    categoryColor: string[],
    categoryDescription: string[]
  ) {
    e.preventDefault();
    console.log(
      JSON.stringify({
        "budget-name": budgetName,
        "category-type": categoryType,
        "category-limit": categoryLimit,
        "category-color": categoryColor,
        "category-description": categoryDescription,
      })
    );
    try {
      const response = await sendBudgetForm(
        budgetName,
        categoryType,
        categoryLimit,
        categoryColor,
        categoryDescription
      );
      if (response.ok) {
        setError(false);
        setToastMessage("Presupuesto guardado con exito");
        setIsToastActive(true);
      } else {
        setError(true);
        setToastMessage("Error al guardar el presupuesto");
        setIsToastActive(true);
      }
    } catch (error) {
      throw console.error(error);
    } finally {
      closeForm();
      setRefreshPage(!refresPage);
    }
  }

  async function recoverBudgets() {
    setLoader(true);
    try {
      const data = await fetchApiBudgets();
      setBudgets(data);
    } catch (error) {
      setError(true);
      setToastMessage("Ha ocurrido un error al recuperar los Presupuestos");
      setIsToastActive(true);
      throw console.error(error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    recoverBudgets();
  }, [refresPage]);

  return (
    <main className="bg-gray-300 min-h-screen">
      <header>
        <div className="flex justify-between font-bold items-center p-2 bg-gray-100 border-b-gray-300 border-b shadow-2xs">
          <h1 className="text-2xl text-gray-800 p-2">Presupuestos</h1>
          <div className="flex gap-5 border-b border-b-gray-300">
            <a
              className={`p-1 hover:text-blue-500 hover:cursor-pointer ${
                activesBudgets && "border-blue-500 border-b text-blue-500"
              }`}
              onClick={() => setActivesBudgets(true)}
            >
              Activos
            </a>
            <a
              className={`p-1 hover:text-blue-500 hover:cursor-pointer ${
                !activesBudgets && "border-blue-500 border-b text-blue-500"
              }`}
              onClick={() => setActivesBudgets(false)}
            >
              Archivados
            </a>
          </div>
          <div className="place-content-center p-2">
            <Button color="blue" icon={<FaPlusCircle />} onClick={newBudget}>
              Agregar presupuesto
            </Button>
          </div>
        </div>
      </header>
      <section>
        <Loader isActive={loader} />
        {budgets && activesBudgets && (
          <div className="grid grid-cols-2 items-start">
            {budgets.map((budget) => budget.isFinish === false && (
              <BudgetsTable
                key={budget.id}
                budget={budget}
                handleDelete={handleDeleteBudget}
                handleEdit={handleEditBudget}
                handleArchive={handleArchiveBudget}
              />
            ))}
          </div>
        )}
        {budgets && !activesBudgets && (
          <div className="items-start grid grid-cols-2">
             {budgets.map((budget) => budget.isFinish !== false && (
              <BudgetsTable
                key={budget.id}
                budget={budget}
                handleDelete={handleDeleteBudget}
                handleEdit={handleEditBudget}
                handleArchive={handleArchiveBudget}
              />
            ))}
          </div>
        )}
      </section>
      <Modal
        isActive={isModalActive}
        setIsActive={setIsModalActive}
        title="Nuevo Presupuesto"
      >
        <BudgetForm
          closeForm={closeForm}
          handleSubmit={handleFormSubmit}
          budgetToEdit={budgetToEdit}
        />
      </Modal>
      <Tooltip id="budgetForm" style={{ maxWidth: 270 }} />
      <Tooltip id="budgetPage" style={{ maxWidth: 270 }} />
      <Toast
        error={error}
        isActive={isToastActive}
        message={toastMessage}
        timeUp={5000}
        closeToast={closeToast}
      />
    </main>
  );
}
