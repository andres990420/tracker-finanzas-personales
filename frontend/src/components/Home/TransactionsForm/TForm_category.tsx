import {
  transactionsExpensivesCategories,
  transactionsIncomesCategories,
} from "../../../utils/categories";
import { tooltipsInfoTransactionForm } from "../../../utils/tooltipsInfo";
import TooltipButton from "../../UI/TooltipButton";

interface Promps {
  setCategory: (value: string) => void;
  transactionType: string;
  transactionToEditInfo?: string
}

export default function TForm_Category(promps: Promps) {
  const { setCategory, transactionType, transactionToEditInfo } = promps;
  const incomesCategories = transactionsIncomesCategories;
  const expensivesCategories = transactionsExpensivesCategories;
  return (
    <>
      <label className="font-bold text-xl  justify-between flex">
        Categoria
        {
          <TooltipButton
            tooltipVariant="info"
            tooltipId="form"
            tooltipContent={tooltipsInfoTransactionForm.TRANSACTION_FORM_CATEGORY}
          />
        }
      </label>
      <select
        required
        className={`border border-gray-800 rounded-2xl p-1 text-center font-bold `}
        name="category"
        onChange={(e) => setCategory(e.target.value)}
        value={transactionToEditInfo}
      >
        {transactionType === "Income" ? (
          <>
            <option selected disabled value={""} className="bg-white">
              Categorias de ingresos
            </option>
            {incomesCategories.map((category) => (
              <option
                key={category[0]}
                className="font-bold"
                value={category[0]}
              >
                {category[0]}
              </option>
            ))}
          </>
        ) : transactionType === "Expensive" ? (
          <>
            <option selected disabled value={""} className="bg-white">
              Categoria de gastos
            </option>
            {expensivesCategories.map((category) => (
              <option
                key={category[0]}
                className="font-bold"
                value={category[0]}
              >
                {category[0]}
              </option>
            ))}
          </>
        ) : (
          <option>Seleccione el tipo de transaccion</option>
        )}
      </select>
    </>
  );
}
