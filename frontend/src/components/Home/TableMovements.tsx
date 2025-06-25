import type { IBudgets, ITransactions } from "../../types/models";
import { Tooltip } from "react-tooltip";
import TooltipButton from "../UI/TooltipButton";
import Button from "../UI/Button";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface Promps {
  transactions: ITransactions[];
  budgets: IBudgets[] | undefined;
  handleDeleteTransaction: (transactionId: string, categoryId: string) => void;
}

export default function TableMovements(promps: Promps) {
  const { transactions, budgets, handleDeleteTransaction } = promps;
  const stylesIncomes =
    "font-bold border text-center  text-green-800/80  hover:bg-green-100";
  const stylesExpensive =
    "font-bold border text-center  text-red-600  hover:bg-red-100";

  function findAttachedBudget(id: string) {
    const budget = budgets?.find((budget) =>
      budget.categories.find((category) =>
        category.transactions.find((transaction) => transaction === id)
      )
    );
    if (budget) {
      return (
        <>
          {budget.name} ({Intl.NumberFormat().format(budget.currentAmount)}$/
          {Intl.NumberFormat().format(budget.maxAmount)}$)
        </>
      );
    } else {
      return "";
    }
  }

  function findCategoryId(id: string) {
    const listBudgets = budgets?.map((budget) =>
      budget.categories.map((category) => category)
    );

    const categories = listBudgets?.find((categories) =>
      categories.find((category) =>
        category.transactions.find((transaction) => transaction === id)
      )
    );
    const category = categories?.find((category) =>
      category.transactions.find((transaction) => transaction === id)
    );
    return category ? category.id : "";
  }
  return (
    <>
      <table className="table-auto w-full border-collapse border">
        <thead className="bg-gray-800 text-white border-b font-bold text-xl border-gray-600">
          <tr className="text-center">
            <th className="px-4 py-2">
              <p className="flex justify-center">
                Categoria
                {
                  <TooltipButton
                    tooltipId="transactionsTable"
                    tooltipContent="Por definir"
                    tooltipVariant="info"
                  />
                }
              </p>
            </th>
            <th className="px-4 py-2 ">
              <p className="flex justify-center ">
                Descripcion
                {
                  <TooltipButton
                    tooltipId="transactionsTable"
                    tooltipContent="Por definir"
                    tooltipVariant="info"
                  />
                }
              </p>
            </th>
            <th className="px-4 py-2">
              <p className="flex justify-center">
                Monto
                {
                  <TooltipButton
                    tooltipId="transactionsTable"
                    tooltipContent="Por definir"
                    tooltipVariant="info"
                  />
                }
              </p>
            </th>
            <th className="px-4 py-2">
              <p className="flex justify-center">
                Fecha
                {
                  <TooltipButton
                    tooltipId="transactionsTable"
                    tooltipContent="Por definir"
                    tooltipVariant="info"
                  />
                }
              </p>
            </th>
            <th className="px-4 py-2">
              <p className="flex justify-center">
                Presupuesto
                {
                  <TooltipButton
                    tooltipId="transactionsTable"
                    tooltipContent="Por definir"
                    tooltipVariant="info"
                  />
                }
              </p>
            </th>
            <th className="px-4 py-2">
              <p className="flex justify-center">
                Acciones
                {
                  <TooltipButton
                    tooltipId="transactionsTable"
                    tooltipContent="Por definir"
                    tooltipVariant="info"
                  />
                }
              </p>
            </th>
          </tr>
        </thead>
        <tbody className="h-24]">
          {transactions &&
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={
                  transaction.type === "Income"
                    ? stylesIncomes
                    : stylesExpensive
                }
              >
                <td
                  key={`${transaction.id}category"`}
                  className="border p-1 "
                >
                  <p>{transaction.category}</p>
                </td>
                <td
                  key={`${transaction.id}-description"`}
                  className="border p-1 overflow-hidden"
                  data-tooltip-content={transaction.description}
                  data-tooltip-id="transactionDescription"
                >
                  <p className="line-clamp-3">{transaction.description}</p>
                </td>
                <td
                  key={`${transaction.id}-amount"`}
                  className="border p-1 "
                >
                  <p>{transaction.amount} $</p>
                </td>
                <td
                  key={`${transaction.id}-date"`}
                  className="border p-1"
                >
                  <p>{transaction.date}</p>
                </td>
                <td
                  key={`${transaction.id}-Budget"`}
                  className="border p-1 "
                >
                  <p>{findAttachedBudget(transaction.id)}</p>
                </td>
                <td
                  key={`${transaction.id}-action"`}
                  className="border p-1 "
                >
                  <div className="flex justify-center">
                    {<Button color="blue" icon={<FaEdit />} />}
                    {
                      <Button
                        color="red"
                        onClick={() =>
                          handleDeleteTransaction(
                            transaction.id,
                            findCategoryId(transaction.id)
                          )
                        }
                        icon={<FaTrashAlt />}
                      />
                    }
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Tooltip id="transactionsTable" />
      <Tooltip id="transactionDescription" variant="dark" place="top" style={{maxWidth:250, maxHeight:130, borderRadius:20}} />
    </>
  );
}
