import { FaInfoCircle } from "react-icons/fa";

interface Promps {
  tooltipContent: string;
  tooltipId: string;
  tooltipVariant: variantType;
}

type variantType = "dark" | "light" | "success" | "warning" | "error" | "info";

export default function TooltipButton(promps: Promps) {
  const { tooltipContent, tooltipId, tooltipVariant } = promps;

  return (
    <>
      <i
        className="p-1 text-lg text-black"
        data-tooltip-content={tooltipContent}
        data-tooltip-id={tooltipId}
        data-tooltip-variant={tooltipVariant}
      >
        {" "}
        {<FaInfoCircle />}{" "}
      </i>
    </>
  );
}
