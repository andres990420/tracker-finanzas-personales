import { FaPlus } from "react-icons/fa";
import Buttons from "../Buttons";
import BudgetsTableItems from "./BudgetTableItems";

interface Promps {
  limitValue: number;
  currentValue: number;
  percentage: number;
  budgetName: string;
  childrentables?: Object[];
}

export default function BudgetsTable(promps: Promps) {
  const { limitValue, currentValue, percentage, budgetName, childrentables } =
    promps;

  return (
    <div className="border border-gray-200 rounded-2xl p-2 font-bold bg-gray-300/60 m-5">
      <div className="flex  border-gray-300 justify-between p-5 rounded-xl border bg-gray-800 shadow-xl">
        <div className="text-center min-h-fit p-3 text-white">
          <h2 className="text-2xl">{budgetName}</h2>
        </div>

        <div className="relative w-[55%] p-2  text-white text-center">
          <div className="relative w-[100%] h-6 bg-gray-200 border border-gray-400 rounded-2xl overflow-hidden">
            <div className="absolute w-[70%] h-[100%] bg-amber-500/80 shadow-2xl  rounded-2xl overflow-hidden text-start text-black"></div>
          </div>
          <p className="text-xl p-1">
            {currentValue}$/ {limitValue}$
          </p>
        </div>
        <div>
          <p className="text-2xl mt-1 text-white">{percentage}%</p>
          <Buttons color="blue" icon={<FaPlus className="h-4 w-4" />} />
        </div>
      </div>
      {childrentables?.map((table) => (
        <BudgetsTableItems
          color="indigo"
          categoryName="Nombre de la categoria"
          currentValue={7000}
          limitValue={10000}
        />
      ))}
    </div>
  );
}
