import { tooltipsInfoTransactionForm } from "../../../utils/tooltipsInfo";
import TooltipButton from "../../UI/TooltipButton";

interface Promps {
  setAmount: (value: string) => void;
  transactionToEditInfo?: string;
}

export default function TForm_amount(promps: Promps) {
  const { setAmount, transactionToEditInfo } = promps;
  return (
    <>
      <label className="font-bold text-xl  justify-between flex">
        Monto
        {
          <TooltipButton
            tooltipVariant="info"
            tooltipId="form"
            tooltipContent={tooltipsInfoTransactionForm.TRANSACTION_FORM_AMOUNT}
          />
        }
      </label>
      <input
        required
        name="amount"
        type="text"
        className="border border-gray-800 rounded-2xl p-1 text-center font-bold"
        placeholder="Ingrese el monto de la transaccion"
        onChange={(e) => setAmount(e.target.value)}
        defaultValue={transactionToEditInfo}
        maxLength={12}
        pattern="[0-9]{1,6}"
      ></input>
    </>
  );
}
