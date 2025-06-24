import { FaBan, FaCheckCircle } from "react-icons/fa";
import Button from "../../UI/Button";
import { useState, useEffect } from "react";
import SwitchButton from "../../UI/SwitchButton";
import TForm_BudgetsAndCategories from "./TForm_Budgets&Categories.tsx";
import type { IBudgets } from "../../../types/models";
import { fetchApiBudgets, sendTransactionsForm } from "../../../Service/api";
import TooltipButton from "../../UI/TooltipButton.tsx";
import { tooltipsInfo } from "../../../assets/tooltipsInfo";
import { Tooltip } from "react-tooltip";
import TForm_Type from "./TForm_Type.tsx";
import TForm_Date from "./TForm_Date.tsx";
import TForm_amount from "./TForm_amount.tsx";
import TForm_Category from "./TForm_category.tsx";
import TForm_description from "./TForm_description.tsx";
import { useNavigate } from "react-router";

interface Promps {
  cancelForm: () => void;
}

export default function TransactionForm(promps: Promps) {
  const { cancelForm } = promps;
  const tooltipInfo = tooltipsInfo;
  const goTo = useNavigate();

  const [haveBudget, setHaveBudget] = useState(false);
  const [budgets, setBudgets] = useState<IBudgets[]>();

  const [transactionType, setTransactionType] = useState<string>("");
  const [amount, setAmount] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();
  const [date, setDate] = useState<string>();

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

  async function handlerSubmit(e: any) {
    e.preventDefault();
    console.log(
      JSON.stringify({
        type: transactionType,
        date: date,
        category: category,
        amount: amount,
        description: description,
        categoryId: categoryId,
      })
    );
    try {
      await sendTransactionsForm(
        transactionType,
        date,
        category,
        amount,
        description,
        categoryId
      );
    } catch (error) {
      throw console.error(error);
    }
    cancelForm()
    goTo('/')
  }

  return (
    <form className="m-1" onSubmit={handlerSubmit}>
      <div className="grid gap-2 p-1 m-1">
        <TForm_Type
          handleSelect={selectTypeTransaction}
          transactionType={transactionType}
        />

        <div className={transactionType !== "" ? " grid gap-2" : "hidden"}>
          <TForm_Date setDate={setDate} />
          <TForm_amount setAmount={setAmount} />
          <TForm_Category
            setCategory={setCategory}
            transactionType={transactionType}
          />
          <TForm_description setDescription={setDescription} />

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
            />
          )}
        </div>
      </div>

      <div className="flex justify-center">
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
