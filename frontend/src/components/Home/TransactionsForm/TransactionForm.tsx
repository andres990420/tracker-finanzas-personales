import { FaBan, FaCheckCircle } from "react-icons/fa";
import Button from "../../UI/Button";
import { useState, useEffect } from "react";
import SwitchButton from "../../UI/SwitchButton";
import TForm_BudgetsAndCategories from "./TForm_Budgets&Categories.tsx";
import type { IBudget, ITransaction } from "../../../types/models";
import { fetchApiBudgets } from "../../../Service/api";
import TooltipButton from "../../UI/TooltipButton.tsx";
import { tooltipsInfoTransactionForm } from "../../../utils/tooltipsInfo.ts";
import { Tooltip } from "react-tooltip";
import TForm_Type from "./TForm_Type.tsx";
import TForm_Date from "./TForm_Date.tsx";
import TForm_amount from "./TForm_amount.tsx";
import TForm_Category from "./TForm_category.tsx";
import TForm_description from "./TForm_description.tsx";

interface Promps {
  cancelForm: () => void;
  handlerSubmit: (
    event: any,
    transactionType: string,
    amount: string,
    category: string,
    description: string,
    date: string,
    categoryId: string | null
  ) => void;
  transactionToEdit?: ITransaction;
  transactionToEditCategoryId?: string

}

export default function TransactionForm(promps: Promps) {
  const { cancelForm, handlerSubmit, transactionToEdit, transactionToEditCategoryId } = promps;
  const tooltipInfo = tooltipsInfoTransactionForm;

  const [haveBudget, setHaveBudget] = useState(transactionToEditCategoryId ? true : false);
  const [budgets, setBudgets] = useState<IBudget[]>();

  const [transactionType, setTransactionType] = useState<string>(transactionToEdit ? transactionToEdit.type : '');
  const [amount, setAmount] = useState<string>(transactionToEdit ? transactionToEdit.amount : '');
  const [category, setCategory] = useState<string>(transactionToEdit ? transactionToEdit.category : '');
  const [description, setDescription] = useState<string>(transactionToEdit ? transactionToEdit.description : '');
  const [categoryId, setCategoryId] = useState<string>(transactionToEditCategoryId ? transactionToEditCategoryId : '');
  const [date, setDate] = useState<string>(transactionToEdit ? transactionToEdit.date : '');

  function activeBudget() {
    setHaveBudget(!haveBudget);
  }

  async function recoverBudgets() {
    try {
      const data = await fetchApiBudgets();
      setBudgets(data);
    } catch (error) {
      throw console.error(error);
    }
  }

  useEffect(() => {
    recoverBudgets();

  }, []);

  function selectTypeTransaction(e: any) {
    if (e.target.value === "Expensive") {
      setTransactionType("Expensive");
    } else if (e.target.value === "Income") {
      setTransactionType("Income");
    }
  }

  return (
    <form
      className="m-1"
      onSubmit={(e) =>
        handlerSubmit(
          e,
          transactionType,
          amount,
          category,
          description,
          date,
          categoryId
        )
      }
    >
      <div className="grid gap-2 p-1 m-1 overflow-y-auto">
        <TForm_Type
          handleSelect={selectTypeTransaction}
          transactionType={transactionType}
        />

        <div className={transactionType !== "" ? " grid gap-2" : "hidden"}>
          <TForm_Date setDate={setDate} transactionToEditInfo={date}/>
          <TForm_amount setAmount={setAmount} transactionToEditInfo={amount}/>
          <TForm_Category
            setCategory={setCategory}
            transactionType={transactionType}
            transactionToEditInfo={category}
          />
          <TForm_description setDescription={setDescription} transactionToEditInfo={description}/>

          {budgets && (
            <div className={`flex justify-between m-1 p-1`}>
              <label className="font-bold text-lg p-1 text-blue-500 flex gap-2">
                Agregar a un presupuesto?
                {
                  <TooltipButton
                    tooltipVariant="info"
                    tooltipId="form"
                    tooltipContent={tooltipInfo.TRANSACTION_FORM_ADD_BUDGET}
                  />
                }
              </label>
              <SwitchButton
                eventTrigger={activeBudget}
                activeState={haveBudget}
                setActiveState={setHaveBudget}
              />
            </div>
          )}
          {haveBudget && budgets && (
            <TForm_BudgetsAndCategories
              budgets={budgets}
              setCategoryId={setCategoryId}
              categoryId={categoryId}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <Button color="violet" type="submit" icon={<FaCheckCircle />}>
          Guardar
        </Button>
        <Button color="red" type="button" onClick={cancelForm} icon={<FaBan />}>
          Cancelar
        </Button>
      </div>
      <Tooltip id={"form"} place="top" style={{ width: 250 }} />
    </form>
  );
}
