import TooltipButton from "../../UI/TooltipButton";
import { tooltipsInfoTransactionForm } from "../../../utils/tooltipsInfo";

interface Promps {
  setDate: (event: any) => void;
  transactionToEditInfo?: string
}

export default function TForm_Date(promps: Promps) {
  const { setDate, transactionToEditInfo } = promps;
  function todayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formattedToday = yyyy + "-" + mm + "-" + dd;
    return formattedToday;
  }
  return (
    <>
      <label className="font-bold text-xl flex justify-between">
        Fecha de la transaccion
        {
          <TooltipButton
            tooltipVariant="info"
            tooltipId="form"
            tooltipContent={tooltipsInfoTransactionForm.TRANSACTION_FORM_DATE}
          />
        }
      </label>
      <input
        type="date"
        name="date"
        className="border border-gray-800 rounded-2xl p-1 justify-items-center font-bold"
        required
        defaultValue={todayDate()}
        value={transactionToEditInfo}
        max={todayDate()}
        onChange={(e) => setDate(e.target.value)}
      ></input>
    </>
  );
}
