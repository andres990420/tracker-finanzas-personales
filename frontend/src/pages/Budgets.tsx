import { useEffect, useState } from "react";
import BudgetForm from "../components/Budgets/BudgetForm/BudgetForm";
import BudgetsTable from "../components/Budgets/BudgetsTable/BudgetsTable";
import Button from "../components/UI/Button";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../components/Modal/Modal";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router";
import { CalculateProgress } from "../utils/utils";
import type { IBudgets } from "../types/models";
import { fetchApiBudgets, sendBudgetForm } from "../Service/api";
import Loader from "../components/UI/Loader";
import { Tooltip } from "react-tooltip";
import Toast from "../components/UI/Toast";

export default function Budgets() {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [budgets, setBudgets] = useState(Array<IBudgets>);
  const [loader, setLoader] = useState<boolean>(true);
  const [refresPage, setRefreshPage] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string>();
  const [isToastActive, setIsToastActive] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
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
    setIsModalActive(true);
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
      } else{
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
    <main className="m-3">
      <header className="justify-items-center font-bold">
        <h1 className="text-4xl text-gray-800 p-4">Presupuestos</h1>
      </header>
      <section>
        <div className="items-center">
          <Button color="blue" icon={<FaPlusCircle />} onClick={newBudget}>
            Agregar un nuevo presupuesto
          </Button>
        </div>
        <Loader isActive={loader} />
        {budgets && (
          <div className="items-center">
            {budgets.map((budget) => (
              <BudgetsTable
                key={budget.id}
                budgetName={budget.name}
                limitValue={budget.maxAmount}
                currentValue={budget.currentAmount}
                percentage={CalculateProgress(
                  budget.currentAmount,
                  budget.maxAmount
                )}
                childrensTables={budget.categories}
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
        <BudgetForm closeForm={closeForm} handleSubmit={handleFormSubmit} />
      </Modal>
      <Tooltip id="budgetForm" style={{maxWidth: 270}}/>
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
