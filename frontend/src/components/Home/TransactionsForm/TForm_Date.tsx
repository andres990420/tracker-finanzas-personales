import TooltipButton from "../../UI/TooltipButton";
import { tooltipsInfo } from "../../../assets/tooltipsInfo";

interface Promps {
  setDate: (event: any) => void;
}

export default function TForm_Date(promps: Promps) {
  const { setDate } = promps;
  return (
    <>
      <label className="font-bold text-xl flex justify-between">
        Fecha de la transaccion
        {
          <TooltipButton
            tooltipVariant="info"
            tooltipId="form"
            tooltipContent={tooltipsInfo.TRANSACTION_FORM_DATE}
          />
        }
      </label>
      <input
        type="date"
        name="date"
        className="border border-gray-800 rounded-2xl p-1 justify-items-center font-bold"
        required
        onChange={(e) => setDate(e.target.value)}
      ></input>
    </>
  );
}
