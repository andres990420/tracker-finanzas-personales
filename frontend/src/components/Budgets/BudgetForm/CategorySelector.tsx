import { budgetsCategories } from "../../../utils/categories";
import { tooltipsInfoBudgetForm } from "../../../utils/tooltipsInfo";
import TooltipButton from "../../UI/TooltipButton";

interface Promps {
  onChangeHandle: (value: string) => void;
  categorySelected?: string
}

export default function CategorySelector(promps: Promps) {
  const { onChangeHandle, categorySelected } = promps;
  const budgetCategories = budgetsCategories;
  const tooltipInfo = tooltipsInfoBudgetForm

  return (
    <div className="p-1 grid justify-center">
      <label className="font-bold flex justify-center">
        Categoria
        <TooltipButton
          tooltipId="budgetForm"
          tooltipVariant="info"
          tooltipContent={tooltipInfo.BUDGET_FORM_CATEGORY}
        />
      </label>
      <select
        className="border rounded-2xl text-center font-semibold"
        name="category-type"
        required
        onChange={(e)=>onChangeHandle(e.target.value)}
        value={categorySelected}
      >
        <option value={""}>
          Selecciona una categoria
        </option>
        {budgetCategories.map((category) => (
          <option  key={category[0]} value={category[0]}>
            {category[0]}
          </option>
        ))}
      </select>
    </div>
  );
}
