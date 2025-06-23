import { useState, type ReactNode } from "react";
import type { IBudgets } from "../../../types/models";

interface Promps {
  budgets: IBudgets[];
  setCategoryId: (id: string) => void;
}

export default function TransactionFormBudgetsAndCategories(promps: Promps) {
  const { budgets, setCategoryId } = promps;
  const [categories, setCategories] = useState<
    React.ReactNode[] | React.ReactNode
  >();
  const [haveCategories, setHaveCategories] = useState(false);

  function selectBudget(e: any) {
    const budgetCategories = searchCategoriesOfBudget(e.target.value);
    if (budgetCategories) {
      setCategories(budgetCategories);
      setHaveCategories(true);
    } else {
      setHaveCategories(false);
    }
  }
  function searchCategoriesOfBudget(id: string) {
    const budget = budgets.find((budget) => budget.id === id);
    if (budget) {
      const categories = budget.categories;
      if (categories) {
        return categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.type}
          </option>
        ));
      }
    }
  }

  function handleCategoryChange(e: any) {
    setCategoryId(e.target.value);
  }

  return (
    <div className="grid gap-1  border-gray-400 border-t border-b py-4 px-3  m-1  transition-all duration-300 ">
      <label className="font-bold text-lg">Presupuesto</label>
      <select
        required
        className="border border-gray-800 rounded-2xl p-1 text-center"
        id="select-budgets"
        onChange={(e) => selectBudget(e)}
      >
        <option value={""} selected disabled>
          Seleccione un presupuesto
        </option>
        {budgets.map((budget) => (
          <option key={budget.id} value={budget.id}>
            {budget.name}
          </option>
        ))}
      </select>

      {haveCategories && (
        <div className="grid gap-1">
          <label className="font-bold text-lg">Categoria</label>
          <select
            required
            className="border border-gray-800 rounded-2xl p-1 text-center"
            name="categoryId"
            onChange={(e) => handleCategoryChange(e)}
          >
            {categories as ReactNode}
          </select>
        </div>
      )}
    </div>
  );
}
