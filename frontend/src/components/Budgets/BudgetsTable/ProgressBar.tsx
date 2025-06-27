interface Promps {
  percentage: number;
  currentValue: number;
  limitValue: number;
  color?: string;
}

export default function ProgressBar(promps: Promps) {
  const { percentage, currentValue, limitValue, color } = promps;
  return (
    <div className="relative w-[95%] p-2 text-center">
      <div className="relative w-[100%] h-6 bg-gray-200 rounded-2xl overflow-hidden">
        <div
          className={`absolute h-[100%]  shadow-2xl  rounded-2xl overflow-hidden text-start text-black ${
            color ? color : "bg-amber-500/80"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
        <p className="relative ">
          {Intl.NumberFormat().format(currentValue)}$/ {Intl.NumberFormat().format(limitValue)}$
          {/* {percentage}% */}
        </p>
      </div>
    </div>
  );
}
