import { useState, type ReactNode } from "react";

export default function TransactionFormBudgetsAndCategories() {
  const [categories, setCategories] = useState(Array);
  const [haveCategories, setHaveCategories] = useState(false);

  function selectBudget() {
    const select = document.getElementById(
      "select-budgets"
    ) as HTMLSelectElement;
    const budgetCategories = searchCategoriesOfBudget(
      select.selectedOptions[0].value
    );
    if (budgetCategories) {
      setCategories(budgetCategories);
      setHaveCategories(true);
    } else {
      setHaveCategories(false);
    }
  }
  function searchCategoriesOfBudget(budgetId: string) {
    const data = [1, 2, 3, 4, 5];
    return data.map((element) => (
      <option value="element">
        categoria {element} de {budgetId}
      </option>
    ));
  }
  return (
    <div className="grid gap-1  border-gray-400 border-t border-b py-4 px-3  m-1  transition-all duration-300 ">
      <label className="font-bold text-lg">Presupuesto</label>
      <select
        required
        className="border border-gray-800 rounded-2xl p-1 text-center"
        id="select-budgets"
        onChange={() => selectBudget()}
      >
        <option value={""} selected disabled>
          Seleccione un presupuesto
        </option>
        <option value={1}>Presupuesto 1</option>
        <option value={2}>Presupuesto 2</option>
      </select>

      {haveCategories && (
        <div className="grid gap-1">
          <label className="font-bold text-lg">Categoria</label>
          <select
            required
            className="border border-gray-800 rounded-2xl p-1 text-center"
            name="categoryId"
          >
            {categories as ReactNode}
          </select>
        </div>
      )}
    </div>
  );
}
