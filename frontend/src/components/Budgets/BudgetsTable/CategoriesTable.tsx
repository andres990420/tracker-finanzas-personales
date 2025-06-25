import { ColorSelector } from "../../../utils/utils";
import ProgressBar from "./ProgressBar";

interface Propms {
  color: string;
  categoryName: string;
  categoryDescription?: string;
  currentValue: number;
  limitValue: number;
}

export default function CategoriesTable(promps: Propms) {
  const { color, categoryName, categoryDescription, currentValue, limitValue } =
    promps;
  const currentProgress = (currentValue * 100) / limitValue;
  const colors = ColorSelector(color);
  return (
    <div
      className={`border text-center border-gray-300 m-2  rounded-xl shadow-lg  backdrop-blur-md ${colors.colorContainer}`}
    >
      <div className="justify-between  min-h-fit flex">
        <h3 className="p-2 mt-2 text-xl">{categoryName}</h3>
        <ProgressBar
          percentage={currentProgress}
          limitValue={limitValue}
          currentValue={currentValue}
          color={colors.colorProgressBar}
        />
        <span className="p-2 text-xl">{currentProgress.toPrecision(4)}%</span>
      </div>
      <p className="p-3 m-1 font-normal">{categoryDescription}</p>
    </div>
  );
}
