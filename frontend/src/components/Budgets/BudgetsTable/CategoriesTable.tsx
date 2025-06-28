import { useEffect, useState } from "react";
import { type ICategory, type ITransactions } from "../../../types/models";
import { ColorSelector } from "../../../utils/utils";
import Button from "../../UI/Button";
import ProgressBar from "./ProgressBar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import TooltipButton from "../../UI/TooltipButton";
import TransactionsOnCategoryTable from "./TransactionsOnCategoryTable";
import { fetchApiTransactions } from "../../../Service/api";
import Toast from "../../UI/Toast";

interface Propms {
  category: ICategory;
  isHidden: boolean;
}

export default function CategoriesTable(promps: Propms) {
  const { category, isHidden } = promps;
  const [hidden, setHidden] = useState<boolean>(true);
  const [buttonIcon, setButtonIcon] = useState(
    <FaChevronDown className="h-4 w-4 text-black" />
  );
  const currentProgress = (category.currentAmount * 100) / category.maxAmount;
  const colors = ColorSelector(category.color);
  const [haveTransactions, setHaveTransactions] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [isToastActive, setIsToastActive] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [transactionsList, setTransactionsList] = useState<ITransactions>();
  const [transactions, setTransactions] = useState<ITransactions[]>();

  function handleClick() {
    if (haveTransactions) {
      hidden
        ? setButtonIcon(<FaChevronUp className="h-4 w-4 text-black" />)
        : setButtonIcon(<FaChevronDown className="h-4 w-4 text-black" />);
      setHidden(!hidden);
    }
  }
  function closeToast() {
    setIsToastActive(!isToastActive);
  }
  
   async function recoverTransactions() {
    try {
      const data = await fetchApiTransactions();
      setTransactions(data);
    } catch (error) {
      setError(true);
      setToastMessage("Error al recuperar las transacciones");
      setIsToastActive(true);
      throw console.error(error);
    }
  }

  useEffect(() => {
    recoverTransactions();
    checkingForTransactions()
  }, []);

  
  function checkingForTransactions() {
    const response = category?.transactions.map((transactionId) => {
      if (transactionId !== "" || undefined) {
        return transactionId;
      } else {
        return "";
      }
    });
    if (response[0] !== "") {
      setHaveTransactions(response.length > 0 && true);
    }
    return ''
  }

  function getTransaction(id: string){
    const transaction = transactions?.find((transaction)=>transaction.id === id)
    return transaction
  }

  return (
    <div
      className={`text-center shadow-xl rounded-xl m-2 
        ${colors.colorContainer} 
         ${isHidden && "hidden"} `}
    >
      <div
        className={`justify-between flex ${
          haveTransactions && `hover:cursor-pointer`
        }`}
        onClick={handleClick}
      >
        <div className=" justify-center items-center gap-1 w-1/4 flex">
          <p className="text-pretty">{category.type}</p>
        </div>
        <div className="w-3/4 flex justify-center items-center">
          <ProgressBar
            percentage={currentProgress}
            limitValue={category.maxAmount}
            currentValue={category.currentAmount}
            color={colors.colorProgressBar}
          />
          <p className="place-content-center text-sm p-1">
            {currentProgress.toPrecision(4)}%
          </p>
        </div>
        {category.transactions && haveTransactions && (
          <Button
            color="blue"
            icon={buttonIcon}
            transparent={true}
            onClick={handleClick}
          />
        )}
      </div>
      <div
        className={` ${
          hidden ? "max-h-0 opacity-0" : "max-h-46 opacity-100 p-3"
        } overflow-y-auto transition-all ease-in-out duration-500 `}
      >
        <div
          className={`rounded-xl shadow-xl bg-gray-100 overflow-y-auto min-h-10 max-h-34 ${
            hidden ? "hidden" : ""
          }`}
        >
          {category.transactions && transactions &&
            category.transactions.map((transaction) => (
              <TransactionsOnCategoryTable
                key={transaction}
                transaction={getTransaction(transaction)}
              />
            ))}
        </div>
      </div>
      <Toast
        error={error}
        isActive={isToastActive}
        message={toastMessage}
        timeUp={5000}
        closeToast={closeToast}
      />
    </div>
  );
}
