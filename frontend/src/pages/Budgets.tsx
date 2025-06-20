import { useEffect, useState } from "react";
import BudgetForm from "../components/Budgets/BudgetForm/BudgetForm";
import BudgetsTable from "../components/Budgets/BudgetsTable/BudgetsTable";
import Button from "../components/UI/Button";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../components/Modal/Modal";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router";
import { CalculateProgress } from "../utils/utils";

interface IBudgets {
  id: string;
  user: string;
  name: string;
  currentAmount: number;
  maxAmount: number;
  categories: [
    {
      id: string;
      type: string;
      color: string;
      description: string;
      currentAmount: number;
      maxAmount: number;
    }
  ];
  createdAt: Date;
  updtedAt: Date;
}

export default function Budgets() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [budgets, setBudgets] = useState(Array<IBudgets>);
  const { isAuthenticated } = useAuth();
  const goTo = useNavigate();

  if (!isAuthenticated) {
      goTo("/");
    }

  async function fetchApiBudgets() {
    try {
      const response = await fetch("http://localhost:4000/budgets", {
        method:"GET",
        credentials: "include",
      });
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchApiBudgets();
  }, []);

  function cancelForm() {
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
          <BudgetsTable
            limitValue={20000}
            currentValue={10000}
            percentage={50}
            budgetName="Nombre del presupuesto"
          />
        </div>
      </section>
      <Modal
        isActive={isModalActive}
        setIsActive={setIsModalActive}
        title="Nuevo Presupuesto"
      >
        <BudgetForm cancelForm={cancelForm} />
      </Modal>
      <section></section>
    </main>
  );
}
