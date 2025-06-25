import { FaCheckCircle } from "react-icons/fa";
import { FaBan, FaX } from "react-icons/fa6";

interface Promps {
  error: boolean;
  message: string | undefined;
  closeToast: () => void;
  isActive: boolean
  timeUp: number
}

export default function Toast(promps: Promps) {
  const { error, message, closeToast, isActive, timeUp } = promps;
  if (isActive) {
    setTimeout(() => {
      closeToast()
    }, timeUp);
  }
  return (
    <div
      className={`right-10 bottom-5 fixed flex align-middle justify-items-center ${
        !isActive && "hidden"
      }`}
    >
      <div
        className={`border h-28 w-72 relative rounded-2xl ${
          error ? "bg-red-600/70" : "bg-green-700/80"
        } text-white`}
      >
        <div className="h-1/4 justify-between flex rounded-t-2xl">
          {" "}
          {/*Header */}
          <p className="p-2 font-bold flex gap-2 text-xl">
            <i className="p-1">{error ? <FaBan /> : <FaCheckCircle />}</i>
            {error ? "Error" : "Success"}
          </p>
          <button 
        onClick={closeToast}
          className="justify-items-center mt-1 mr-2 size-5 p-1">
            <FaX />
          </button>
        </div>
        <div className="h-2/3  p-1 m-1 ">
          {" "}
          {/*Body */}
          <p className="p-1 text-lg">{message}</p>
        </div>
      </div>
    </div>
  );
}
