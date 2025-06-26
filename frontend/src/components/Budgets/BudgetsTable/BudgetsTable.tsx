import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../UI/Button";
import CategoriesTable from "./CategoriesTable";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import type { ICategory } from "../../../types/models";

interface Promps {
  limitValue: number;
  currentValue: number;
  percentage: number;
  budgetName: string;
  childrensTables?: ICategory[];
}

export default function BudgetsTable(promps: Promps) {
  const { limitValue, currentValue, percentage, budgetName, childrensTables } =
    promps;
  const [hidden, setHidden] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(
    <FaChevronDown className="h-4 w-4" />
  );
  const [haveCategories, setHaveCategories] = useState<boolean>(false);

  function handleClick() {
    hidden
      ? setButtonIcon(<FaChevronUp className="h-4 w-4" />)
      : setButtonIcon(<FaChevronDown className="h-4 w-4" />);
    setHidden(!hidden);
  }

  function checkingForCategories() {
    const response = childrensTables?.map((e) => {
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
    <div className="border border-gray-300/40 rounded-2xl font-bold bg-gray-300/60 m-5 shadow-xl ">
      <div
        className={`flex justify-between ${
          hidden ? "rounded-2xl" : "rounded-t-xl"
        } bg-gray-700 border-gray-700/40 borde transition-all duration-300`}
      >
        <div className="text-center justify-items-center text-white w-1/4 p-3">
          <h2 className="text-xl">{budgetName}</h2>
        </div>
        <div className="justify-items-center w-3/4 p-2 flex">
          <ProgressBar
            percentage={percentage}
            limitValue={limitValue}
            currentValue={currentValue}
          />
          <p className="text-xl p-1 text-white">{percentage}%</p>
        </div>
        <div className="flex">
          <Button
            color="blue"
            onClick={()=>console.log('Edit budget')}
            icon={<FaEdit />}
            transparent={true}
          />
          <Button
            color="blue"
            onClick={()=>console.log('Delete budget')}
            icon={<FaTrash />}
            transparent={true}
          />
          {childrensTables && haveCategories && (
            <Button
              color="blue"
              onClick={handleClick}
              icon={buttonIcon}
              transparent={true}
            />
          )}
        </div>
      </div>
      <div
        className={`${
          hidden ? "max-h-0 opacity-0" : "max-h-70 opacity-100 p-1"
        } transition-all duration-700 ease-in-out overflow-y-auto`}
      >
        {childrensTables?.map((category) => (
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
