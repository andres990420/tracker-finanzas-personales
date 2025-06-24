import type { IBudgets, ITransactions } from "../../types/models";
import { Tooltip } from "react-tooltip";
import TooltipButton from "../UI/TooltipButton";
import Button from "../UI/Button";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface Promps {
  transactions: ITransactions[];
  budgets: IBudgets[];
  handleDeleteTransaction: (transactionId: string, categoryId: string) => void;
}

export default function TableMovements(promps: Promps) {
  const { transactions, budgets, handleDeleteTransaction } = promps;
  const stylesIncomes =
    "font-bold border text-center bg-green-100 text-green-800 border-green-300 hover:bg-green-400/80";
  const stylesExpensive =
    "font-bold border text-center bg-red-100/20 text-red-800 border-red-300 hover:bg-red-400/80";

  function findAttachedBudget(id: string) {
    const budget = budgets?.find((budget) =>
      budget.categories.find((category) =>
        category.transactions.find((transaction) => transaction === id)
      )
    );
    return budget ? budget.name : "";
  }

  function findCategoryId(id: string) {
    const listBudgets = budgets?.map((budget) =>
      budget.categories.map((category) => category)
    );

    const categories = listBudgets.find((categories) =>
      categories.find((category) =>
        category.transactions.find((transaction) => transaction === id)
      )
    );
    const category = categories?.find(category=>category.transactions.find(transaction=>transaction === id))
    return category ? category.id : ''
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
              <p className="flex justify-center">
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
        <tbody>
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
                  className="border px-2 py-1"
                >
                  {transaction.category}
                </td>
                <td
                  key={`${transaction.id}-descrption"`}
                  className="border px-2 py-1"
                >
                  {transaction.description}
                </td>
                <td
                  key={`${transaction.id}-amount"`}
                  className="border px-2 py-1"
                >
                  {transaction.amount} $
                </td>
                <td
                  key={`${transaction.id}-date"`}
                  className="border px-2 py-1"
                >
                  {transaction.date}
                </td>
                <td
                  key={`${transaction.id}-Budget"`}
                  className="border px-2 py-1"
                >
                  {findAttachedBudget(transaction.id)}
                </td>
                <td
                  key={`${transaction.id}-action"`}
                  className="border px-2 py-1 flex justify-center"
                >
                  {<Button color="blue" icon={<FaEdit />} />}
                  {
                    <Button
                      color="red"
                      onClick={() => handleDeleteTransaction(transaction.id, findCategoryId(transaction.id))}
                      icon={<FaTrashAlt />}
                    />
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Tooltip id="transactionsTable" />
    </>
  );
}
