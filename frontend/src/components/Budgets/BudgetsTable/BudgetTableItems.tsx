import { ColorSelector } from "../../../utils/utils";

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
      <div className="relative w-[55%] px-2 py-2 m-3">
        <div className="relative w-[100%] h-6 bg-gray-200 border border-gray-400 rounded-2xl overflow-hidden">
          <div
            className={`absolute w-[${0}%] h-[100%]  shadow-2xl  rounded-2xl overflow-hidden  ${colors.colorProgressBar}`}
          ></div>
        </div>
        <p className="text-xl">
          {currentValue}$/{limitValue}$
        </p>
      </div>
      <span className="p-2 text-xl">{currentProgress}%</span>
    </div>
  );
}
