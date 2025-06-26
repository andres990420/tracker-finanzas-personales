import { tooltipsInfoTransactionForm } from "../../../utils/tooltipsInfo";
import TooltipButton from "../../UI/TooltipButton";

interface Promps {
  transactionType: string;
  handleSelect: (event: any) => void;
}

export default function TForm_Type(promps: Promps) {
  const { transactionType, handleSelect } = promps;
  const tooltipInfo = tooltipsInfoTransactionForm;

  return (
    <>
      <label className="font-bold text-xl flex justify-between">
        Tipo de transaccion{" "}
        {
          <TooltipButton
            tooltipVariant="info"
            tooltipId="form"
            tooltipContent={tooltipInfo.TRANSACTION_FORM_TYPE_TRANSACTION}
          />
        }
      </label>
      <select
        required
        name="type"
        id="select-type-transaction"
        className={`border font-bold rounded-2xl p-1 text-center ${
          transactionType === "Income"
            ? "bg-green-200/40 text-green-800 border-green-600"
            : transactionType === "Expensive"
            ? "bg-red-200/50 text-red-800 border-red-600"
            : "bg-white"
        }`}
        onChange={handleSelect}
      >
        <option className="bg-white" disabled value={""} selected>
          Selecciona el tipo de transaccion
        </option>
        <option
          className="bg-green-600/40 text-green-800 selection:bg-blue-20"
          value={"Income"}
        >
          Ingreso
        </option>
        <option className="bg-red-400/50 text-red-800" value={"Expensive"}>
          Gasto
        </option>
      </select>
    </>
  );
}
