import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "../../UI/Button";
import BudgetsTableItems from "./BudgetTableItems";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import type { ICategory } from "../../../types/models";

interface Promps {
  limitValue: number;
  currentValue: number;
  percentage: number;
  budgetName: string;
  childrensTables?: ICategory[]
}

export default function BudgetsTable(promps: Promps) {
  const { limitValue, currentValue, percentage, budgetName, childrensTables } =
    promps;
  const [hidden, setHidden] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(<FaPlus className="h-4 w-4" />);
  function handleClick() {
    hidden
      ? setButtonIcon(<FaMinus className="h-4 w-4" />)
      : setButtonIcon(<FaPlus className="h-4 w-4" />);
    setHidden(!hidden);
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-2 font-bold bg-gray-300/60 m-5">
      <div className="flex  border-gray-300 justify-between p-5 rounded-xl border bg-gray-800 shadow-xl">
        <div className="text-center min-h-fit p-3 text-white">
          <h2 className="text-2xl">{budgetName}</h2>
        </div>
        <ProgressBar percentage={percentage} limitValue={limitValue} currentValue={currentValue}/>
        <div>
          <p className="text-2xl mt-1 text-white">{percentage}%</p>
          {childrensTables && (
            <Button color="blue" onClick={handleClick} icon={buttonIcon} />
          )}
        </div>
      </div>
      <div className={`${hidden ? "hidden" : ""}`}>
        {childrensTables?.map((category) => (
          <BudgetsTableItems
            key={category.id}
            color={category.color}
            categoryName={category.type}
            currentValue={category.currentAmount}
            limitValue={category.maxAmount}
            categoryDescription={category.description}
          />
        ))}
      </div>
    </div>
  );
}
