import BudgetsTable from "../components/BudgetsTable/BudgetsTable";

export default function Budgets() {
  return (
    <div className="m-3">
      <div className="justify-items-center font-bold">
        <h1 className="text-4xl text-gray-800 p-4">Presupuestos</h1>
      </div>
      <div>
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
      </div>
    </div>
  );
}
