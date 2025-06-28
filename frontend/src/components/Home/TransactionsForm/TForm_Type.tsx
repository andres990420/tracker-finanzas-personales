import { tooltipsInfoTransactionForm } from "../../../utils/tooltipsInfo";
import TooltipButton from "../../UI/TooltipButton";

interface Promps {
  transactionType: string;
  handleSelect: (event: any) => void;
  transactionToEditInfo?: string
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
            ? " text-green-800 "
            : transactionType === "Expensive"
            ? " text-red-600 "
            : "bg-white"
        }`}
        onChange={handleSelect}
        value={transactionType}
      >
        <option className="bg-white" value={""} selected>
          Selecciona el tipo de transaccion
        </option>
        <option
          className=" text-green-800"
          value={"Income"}
        >
          Ingreso
        </option>
        <option className=" text-red-600" value={"Expensive"}>
          Gasto
        </option>
      </select>
    </>
  );
}
