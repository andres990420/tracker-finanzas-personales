import { FaSearch } from "react-icons/fa";

export default function FilterBar() {
  return (
    <>
      <div className="flex bg-gray-800 rounded-3xl">
        {/* <h2 className="py-2 m-2 text-xl">Filtros</h2>
        <hr className="bg-black h-full border-s-2"></hr> */}
        <button className="rounded-2xl px-3 m-3 bg-gray-100 text-black  active:bg-amber-400">Ingresos</button>
        <button disabled className="rounded-2xl px-3 m-3 bg-gray-100 text-black">Egresos</button>
        <span className="flex rounded-2xl border border-gray-100 m-3 bg-gray-800">
          <FaSearch className="m-2 text-white" />
          <hr className="bg-black h-full border-s"></hr>
          <input
            type="text"
            className=" text-left px-2 rounded-r-2xl bg-gray-100"
          ></input>
        </span>
        <select className="px-3 rounded-3xl m-3 bg-gray-100 text-black text-center">
          <option disabled>Seleccione una Categoria</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
    </>
  );
}
