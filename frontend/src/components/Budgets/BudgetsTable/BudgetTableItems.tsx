import { ColorSelector } from "../../../utils/utils";
import ProgressBar from "./ProgressBar";

interface Propms {
  color: string;
  categoryName: string;
  categoryDescription?: string;
  currentValue: number;
  limitValue: number;
}

export default function BudgetsTableItems(promps: Propms) {
  const { color, categoryName, categoryDescription, currentValue, limitValue } =
    promps;
  const currentProgress = (currentValue * 100) / limitValue;
  const colors = ColorSelector(color);
  return (
    <div
      className={`flex border text-center border-gray-300 m-2 justify-between rounded-xl shadow-lg  backdrop-blur-md ${colors.colorContainer}`}
    >
      <div className="justify-self-center w-[350px] min-h-fit">
        <h3 className="p-2 mt-2 text-xl">{categoryName}</h3>
        <p className="p-3 m-1 font-normal leading-relaxed">
          {categoryDescription}
        </p>
      </div>
      <ProgressBar
        percentage={currentProgress}
        limitValue={limitValue}
        currentValue={currentValue}
        color={colors.colorProgressBar}
      />
      <span className="p-2 text-xl">{currentProgress.toPrecision(4)}%</span>
    </div>
  );
}
