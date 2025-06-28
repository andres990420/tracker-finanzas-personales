import { tooltipsInfoBudgetForm } from "../../utils/tooltipsInfo";
import { ColorSelector, ColorsList } from "../../utils/utils";
import TooltipButton from "./TooltipButton";

interface Promps {
  onChange: (event: any) => void;
  colorSelected: string;
}

export default function ColorPicker(promps: Promps) {
  const { onChange, colorSelected } = promps;
  const tooltipInfo = tooltipsInfoBudgetForm
  const colors = ColorsList;
 
  return (
    <>
      <div className="p-1">
        <label className="p-1 font-bold flex">
          Color de categoria
          <TooltipButton
            tooltipId="budgetForm"
            tooltipVariant="info"
            tooltipContent={tooltipInfo.BUDGET_FORM_CATEGORY_COLOR}
          />
        </label>
        <select
          required
          value={colorSelected}
          onChange={(e)=>onChange(e.target.value)}
          name={"category-color"}
          className={"text-center rounded-2xl border z-10 border-black font-semibold"}
        >
          <option defaultValue={"bg-white"}>Selecciona un color</option>
          {colors.map((color) => (
            <option
              key={color}
              className={`text-bold ${ColorSelector(color).colorContainer}`}
              value={color}
            >
              {ColorSelector(color).colorName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
