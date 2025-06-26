import { tooltipsInfoTransactionForm } from "../../../utils/tooltipsInfo";
import TooltipButton from "../../UI/TooltipButton";

interface Promps {
  setDescription: (value: string) => void;
}

export default function TForm_description(promps: Promps) {
  const { setDescription } = promps;
  return (
    <>
      <label className="font-bold text-xl  flex justify-between">
        Descripcion de la transacion
        {
          <TooltipButton
            tooltipVariant="info"
            tooltipId="form"
            tooltipContent={tooltipsInfoTransactionForm.TRANSACTION_FORM_DESCRIPTION}
          />
        }
      </label>
      <textarea
        name="description"
        className="border border-gray-800 rounded-xl p-2 h-25"
        maxLength={150}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </>
  );
}
