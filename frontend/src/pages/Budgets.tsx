import { useEffect, useState } from "react";
import BudgetForm from "../components/Budgets/BudgetForm/BudgetForm";
import BudgetsTable from "../components/Budgets/BudgetsTable/BudgetsTable";

interface IBudgets {
  id: string;
  user: string;
  name: string;
  currentAmount: number;
  maxAmount: number;
  categories: [{ type: string; color: string; description: string , currentAmount: number, maxAmount: number}];
  createdAt: Date;
  updtedAt: Date;
}

export default function Budgets() {
  const [budgets, setBudgets] = useState(Array<IBudgets>);
  useEffect( () => {
    async function fetchApiBudgets(){
      const response = await fetch("http://localhost:4000/budgets");
      const data = await response.json()
      setBudgets(data)
    } 
    fetchApiBudgets()
  }, []);
  let percentage;
  return (
    <main className="m-3">
      <header className="justify-items-center font-bold">
        <h1 className="text-4xl text-gray-800 p-4">Presupuestos</h1>
      </header>
      <section>
        {budgets.map((budget) => (
          percentage = budget.currentAmount / budget.maxAmount,
          <BudgetsTable 
            key={budget.id}
            budgetName={budget.name}
            limitValue={budget.maxAmount}
            currentValue={budget.currentAmount}
            percentage={percentage}
            childrensTables={budget.categories}
        />
        ))}
        <BudgetsTable
          limitValue={20000}
          currentValue={10000}
          percentage={50}
          budgetName="Nombre del presupuesto"
          // childrensTables={[{}, {}]}
        />
        <BudgetsTable
          limitValue={20000}
          currentValue={10000}
          percentage={50}
          budgetName="Nombre del presupuesto"
        />
      </section>
      <section>
        <BudgetForm />
      </section>
    </main>
  );
}
