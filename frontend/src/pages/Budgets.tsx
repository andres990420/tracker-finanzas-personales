import BudgetForm from "../components/Budgets/BudgetForm/BudgetForm";
import BudgetsTable from "../components/Budgets/BudgetsTable/BudgetsTable";

export default function Budgets() {
  return (
    <main className="m-3">
      <header className="justify-items-center font-bold">
        <h1 className="text-4xl text-gray-800 p-4">Presupuestos</h1>
      </header>
      <section>
        <BudgetsTable
          limitValue={20000}
          currentValue={10000}
          percentage={50}
          budgetName="Nombre del presupuesto"
          childrensTables={[{}, {}]}
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
