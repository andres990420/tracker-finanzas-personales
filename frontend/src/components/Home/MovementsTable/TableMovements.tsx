import type { IBudgets, ITransactions } from "../../../types/models";
import { Tooltip } from "react-tooltip";
import Button from "../../UI/Button";
import { FaEdit, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import TableHeader from "./TableHeader";
import TableData from "./TableData";

interface Promps {
  transactions: ITransactions[];
  budgets: IBudgets[] | undefined;
  handleDeleteTransaction: (transactionId: string, categoryId: string) => void;
}

export default function MovementsTable(promps: Promps) {
  const { transactions, budgets, handleDeleteTransaction } = promps;


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
      <div className="rounded-2xl shadow-xl overflow-x-auto">
        <table className="table-auto min-w-full">
          <thead className=" font-bold text-xl bg-gray-800 text-white">
            <tr className="text-center">
              <TableHeader>Categoria</TableHeader>
              <th className="p-2 w-2/5">
                <p className="flex justify-center">Descripcion</p>
              </th>
              <TableHeader>Monto</TableHeader>
              <TableHeader>Fecha</TableHeader>
              <TableHeader>Acciones</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-gray-100  rounded-2xl">
            {transactions &&
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={"text-center border-t rounded-2xl border-gray-300"}
                >
                  <TableData id={transaction.id}>
                    <p
                      className={`${
                        transaction.type === "Income"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-bold`}
                    >
                      {transaction.category}
                    </p>
                  </TableData>
                  <TableData id={transaction.id}>
                    <div className=" w-max-10 ">
                      <p
                        data-tooltip-id="transactionDescription"
                        data-tooltip-content={transaction.description}
                        className="line-clamp-3 w-max-10"
                      >
                        {transaction.description}
                      </p>
                      <p className="w-max-10 text-sm font-light">
                        {findAttachedBudget(transaction.id)}
                      </p>
                    </div>
                  </TableData>
                  <TableData id={transaction.id}>
                    <p
                      className={`${
                        transaction.type === "Income"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-bold`}
                    >
                      ${transaction.amount}
                    </p>
                  </TableData>
                  <TableData id={transaction.id}>
                    {/* <p>{transaction.date}</p> */}
                    <p>12/5/2025</p>
                  </TableData>
                  <TableData id={transaction.id}>
                    <div className="flex justify-center">
                      {
                        <Button
                          color="blue"
                          icon={<FaInfoCircle className="text-blue-500" />}
                          transparent={true}
                        />
                      }
                      {
                        <Button
                          color="blue"
                          icon={<FaEdit className="text-blue-500" />}
                          transparent={true}
                        />
                      }
                      {
                        <Button
                          color="red"
                          onClick={() =>
                            handleDeleteTransaction(
                              transaction.id,
                              findCategoryId(transaction.id)
                            )
                          }
                          icon={<FaTrashAlt className="text-red-600" />}
                          transparent={true}
                        />
                      }
                    </div>
                  </TableData>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Tooltip id="transactionsTable" />
      <Tooltip
        id="transactionDescription"
        variant="dark"
        place="top"
        style={{ maxWidth: 250, maxHeight: 150, borderRadius: 20 }}
      />
    </>
  );
}
