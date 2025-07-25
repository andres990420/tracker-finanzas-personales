import {
  FaArchive,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Button from "../../UI/Button";
import CategoriesTable from "./CategoriesTable";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import type { IBudget, ITransaction } from "../../../types/models";
import { CalculateProgress } from "../../../utils/utils";
import Toast from "../../UI/Toast";

interface Promps {
  budget: IBudget;
  handleDelete: (budgetId: string) => void;
  handleEdit: (budgetId: string) => void;
  handleArchive: (budgetId: string, budgetStatus: boolean) => void
}

export default function BudgetsTable(promps: Promps) {
  const { budget, handleDelete, handleEdit, handleArchive } = promps;
  const [hidden, setHidden] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(
    <FaChevronDown className="h-4 w-4" />
  );

  const [haveCategories, setHaveCategories] = useState<boolean>(false);

  const percentage = CalculateProgress(budget.currentAmount, budget.maxAmount);

  function handleClick() {
    if (haveCategories) {
      hidden
        ? setButtonIcon(<FaChevronUp className="h-4 w-4" />)
        : setButtonIcon(<FaChevronDown className="h-4 w-4 " />);
      setHidden(!hidden);
    }
  }

  function checkingForCategories() {
    const response = budget.categories?.map((e) => {
      if (e.id !== "" || undefined) {
        return true;
      } else {
        return false;
      }
    });
    if (response) {
      setHaveCategories(response.length > 0 && true);
    }
  }

  useEffect(() => {
    checkingForCategories();
  }, []);

  return (
    <div className="border border-gray-300/40 rounded-2xl font-bold bg-gray-100 m-3 shadow-xl ">
      <div
        className={`flex justify-between ${
          hidden ? "rounded-xl" : "rounded-t-xl"
        } bg-gray-800 border-gray-700/40 borde transition-all duration-300 `}
      >
        <div className="text-center place-content-center text-white w-1/4 p-1">
          <h2 className="text-lg">{budget.name}</h2>
        </div>
        <div className="w-3/4 p-1 flex items-center justify-center">
          <ProgressBar
            percentage={percentage}
            limitValue={budget.maxAmount}
            currentValue={budget.currentAmount}
          />
          <p className="text-lg  text-white">{percentage}%</p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            color="blue"
            onClick={() => handleArchive(budget.id, budget.isFinish)}
            icon={<FaArchive />}
            transparent={true}
          />
          <Button
            color="blue"
            onClick={() => handleEdit(budget.id)}
            icon={<FaEdit />}
            transparent={true}
          />
          <Button
            color="blue"
            onClick={() => handleDelete(budget.id)}
            icon={<FaTrash />}
            transparent={true}
          />
          {haveCategories && (
            <Button
              color="blue"
              icon={buttonIcon}
              transparent={true}
              onClick={handleClick}
            />
          )}
        </div>
      </div>
      <div
        className={`${
          hidden ? "max-h-0 opacity-0" : "max-h-50 opacity-100"
        } transition-all duration-500 ease-in-out overflow-y-auto`}
      >
        {budget.categories?.map((category) => (
          <CategoriesTable
            isHidden={hidden}
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
