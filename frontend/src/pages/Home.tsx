import { FaPlus} from "react-icons/fa";
import TableMovements from "../components/TableMovements";
import Buttons from "../components/Buttons";
import FilterBar from "../components/FiltersBar";

export default function Inicio() {
  return (
    <>
      <div className=" m-3">
        <div className="justify-items-center font-bold">
          <h1 className="text-4xl text-gray-800">Tracker finanzas personales</h1>
        </div>
        <div className="flex justify-between m-4">
          <Buttons color="blue" text="Nuevo Movimiento" icon={<FaPlus />} />
          <FilterBar />
        </div>
        <div className=" h-screen">
          <div className="justify-items-center">
            <TableMovements />
          </div>
        </div>
      </div>
    </>
  );
}
