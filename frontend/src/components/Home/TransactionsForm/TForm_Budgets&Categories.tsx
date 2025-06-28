import { useEffect, useState, type ReactNode } from "react";
import type { IBudget } from "../../../types/models";
import TooltipButton from "../../UI/TooltipButton";
import { tooltipsInfoTransactionForm } from "../../../utils/tooltipsInfo";

interface Promps {
  budgets: IBudget[];
  setCategoryId: (id: string) => void;
  categoryId: string;
}

export default function TForm_BudgetsAndCategories(promps: Promps) {
  const { budgets, setCategoryId, categoryId } = promps;
  const [categories, setCategories] = useState<
    React.ReactNode[] | React.ReactNode
  >();
  const [haveCategories, setHaveCategories] = useState(
    categoryId ? true : false
  );
  const budget = budgets.find((budget) =>
    budget.categories.find((category) => category.id === categoryId)
  );

  useEffect(() => {
    if (budget) {
      selectBudget(budget.id);
    }
  }, []);

  function selectBudget(id: string) {
    const budgetCategories = searchCategoriesOfBudget(id);
    if (budgetCategories && budgetCategories?.length > 0) {
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
            {category.type} (
            {Intl.NumberFormat().format(category.currentAmount)}$/
            {Intl.NumberFormat().format(category.maxAmount)}$)
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
      <label className="font-bold text-lg flex justify-between">
        Presupuesto
        {
          <TooltipButton
            tooltipVariant="info"
            tooltipId="form"
            tooltipContent={tooltipsInfoTransactionForm.TRANSACTION_FORM_BUDGET}
          />
        }
      </label>
      <select
        required
        className="border border-gray-800 rounded-2xl p-1 text-center"
        id="select-budgets"
        onChange={(e) => selectBudget(e.target.value)}
        value={budget?.id}
      >
        <option value={""}>Seleccione un presupuesto</option>
        {budgets.map((budget) => (
          <option key={budget.id} value={budget.id}>
            {budget.name}
          </option>
        ))}
      </select>

      {haveCategories && (
        <div className="grid gap-1">
          <label className="font-bold text-lg flex justify-between">
            Categoria
            {
              <TooltipButton
                tooltipVariant="info"
                tooltipId="form"
                tooltipContent={
                  tooltipsInfoTransactionForm.TRANSACTION_FORM_BUDGET_CATEGORY
                }
              />
            }
          </label>
          <select
            required
            className="border border-gray-800 rounded-2xl p-1 text-center"
            name="categoryId"
            onChange={(e) => handleCategoryChange(e)}
            value={categoryId}
          >
            <option value={""} selected disabled>
              Selecciona una categoria
            </option>
            {categories as ReactNode}
          </select>
        </div>
      )}
    </div>
  );
}
