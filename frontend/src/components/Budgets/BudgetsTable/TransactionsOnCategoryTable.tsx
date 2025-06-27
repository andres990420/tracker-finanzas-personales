import type { ITransactions } from "../../../types/models";
import { CalculateDescriptionAreaSize } from "../../../utils/utils";
import TooltipButton from "../../UI/TooltipButton";

interface Promps {
  transaction: ITransactions;
}

export default function TransactionsOnCategoryTable(promps: Promps) {
  const { transaction} = promps;
  const descriptionSize = CalculateDescriptionAreaSize(
    transaction.description.length
  );

  return (

      <div
        className={`justify-between flex text-center text-sm h-fit gap-1   `}
      >
        <div
          className={`p-1 ${
            transaction.description.length > 40 ? "w-1/6" : "w-2/6"
          } flex justify-center items-center`}
        >
          <p className={`p-1 ${
              transaction.type === "Income" ? "text-green-700" : "text-red-600"
            }`}>{transaction.category}</p>
        </div>
        <div className="p-1 w-1/6 font-medium flex justify-center items-center">
          <p className="p-1">{transaction.date}</p>
        </div>
        <div className="p-1 w-1/6 font-medium flex justify-center items-center">
          <p
            className={`p-1 ${
              transaction.type === "Income" ? "text-green-700" : "text-red-600"
            }`}
          >
            ${Intl.NumberFormat().format(Number(transaction.amount))}
          </p>
        </div>
        <div
          className={`p-1 ${descriptionSize} flex justify-center items-center ${
            !transaction.description && "hidden"
          }`}
        >
          <p
            className=" line-clamp-2 font-medium"
            data-tooltip-id="budgetPage"
            data-tooltip-content={transaction.description}
            data-tooltip-variant="dark"
          >
            {transaction.description}
          </p>
        </div>
      </div>
  );
}
