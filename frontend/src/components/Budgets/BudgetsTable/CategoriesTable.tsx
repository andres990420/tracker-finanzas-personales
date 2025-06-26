import { useEffect, useState } from "react";
import type { ICategory } from "../../../types/models";
import { ColorSelector } from "../../../utils/utils";
import Button from "../../UI/Button";
import ProgressBar from "./ProgressBar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import TooltipButton from "../../UI/TooltipButton";
import TransactionsOnCategoryTable from "./TransactionsOnCategoryTable";

interface Propms {
  category: ICategory;
  isHidden: boolean;
}

export default function CategoriesTable(promps: Propms) {
  const { category, isHidden } = promps;
  const [hidden, setHidden] = useState<boolean>(true);
  const [buttonIcon, setButtonIcon] = useState(
    <FaChevronDown className="h-4 w-4" />
  );
  const currentProgress = (category.currentAmount * 100) / category.maxAmount;
  const colors = ColorSelector(category.color);
  const [haveTransactions, setHaveTransactions] = useState<boolean>(false);

  function handleClick() {
    hidden
      ? setButtonIcon(<FaChevronUp className="h-4 w-4" />)
      : setButtonIcon(<FaChevronDown className="h-4 w-4" />);
    setHidden(!hidden);
  }

  function checkingForTransactions() {
    const response = category?.transactions.map((e) => {
      if (e !== "" || undefined) {
        return true;
      } else {
        return false;
      }
    });
    if (response) {
      setHaveTransactions(response.length > 0 && true);
    }
  }

  useEffect(() => {
    checkingForTransactions();
  }, []);

  return (
    <div
      className={`text-center shadow-xl rounded-xl m-2 
        ${colors.colorContainer} 
         ${isHidden && "hidden"}`}
    >
      <div className="justify-between flex">
        <div className=" justify-center gap-1 w-1/4 p-3 flex">
          <h3 className="text-lg">{category.type}</h3>
          {category.description && (
            <TooltipButton
              tooltipId="budgetPage"
              tooltipVariant="dark"
              tooltipContent={`${category.description}`}
            />
          )}
        </div>
        <div className="w-3/4 flex p-2 justify-items-center">
          <ProgressBar
            percentage={currentProgress}
            limitValue={category.maxAmount}
            currentValue={category.currentAmount}
            color={colors.colorProgressBar}
          />
          <span className="p-2 text-xl">{currentProgress.toPrecision(4)}%</span>
        </div>
        {category.transactions && haveTransactions && (
          <Button
            color="blue"
            icon={buttonIcon}
            transparent={true}
            onClick={handleClick}
            iconcolor="black"
          />
        )}
      </div>
      <div
        className={` ${
          hidden ? "max-h-0 opacity-0" : "max-h-46 opacity-100 p-3"
        } overflow-y-auto transition-all ease-in-out duration-500 `}
      >
        <div
          className={`rounded-xl shadow-xl bg-slate-200 overflow-y-auto min-h-10 max-h-34 ${hidden ? 'hidden' : ''}`}
        >
          {category.transactions &&
            category.transactions.map((transactions) => (
              <TransactionsOnCategoryTable
                key={transactions}
                transaction={{
                  amount: "1000",
                  type: "Expensive",
                  category: "Sueldo y Salario",
                  description:
                    // "holaaa",
                    // "holaaaaaa!",
                    // "hollladddddddddddddddddddddddddddddddddd",
                    // "hollladdddddddddddddddddddddddddddddddddd",
                    "asda sadas asdada dad dasdsaa dasdad adadadsadada dasdadadasdsadsa adsadsadasda adadsdassdadas adadasda dasdadad dasdadadad dasda adadsad dadasdasdada",
                  date: "6/12/2025",
                  id: "6921331",
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
