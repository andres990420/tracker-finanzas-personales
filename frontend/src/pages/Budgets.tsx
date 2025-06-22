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
import { fetchApiBudgets } from "../Service/api";


export default function Budgets() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [budgets, setBudgets] = useState(Array<IBudgets>);
  const { isAuthenticated } = useAuth();
  const goTo = useNavigate();

  if (!isAuthenticated) {
    goTo("/");
  }

  async function recoverBudgets() {
    try {
      const data = await fetchApiBudgets()
      setBudgets(data);
    } catch (error) {
      throw console.error(error);
    }
  }
  useEffect(() => {
    recoverBudgets();
  }, []);

  function closeForm() {
    setIsModalActive(!isModalActive);
  }

  function newBudget() {
    setIsModalActive(true);
  }
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
      </section>
      <Modal
        isActive={isModalActive}
        setIsActive={setIsModalActive}
        title="Nuevo Presupuesto"
      >
        <BudgetForm closeForm={closeForm} />
      </Modal>
      <section></section>
    </main>
  );
}
