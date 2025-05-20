import { FaBan } from "react-icons/fa";
import Button from "../../UI/Button";
import ColorPicker from "./ColorPicker";
import CategorySelector from "./CategorySelector";
import { useState } from "react";
import { ColorSelector } from "../../../utils/utils";

interface Promps {
  onClick: (event: any) => void;
}

export default function BudgetFormCategory(promps: Promps) {
  const { onClick } = promps;
  const [bgColor, setBgColor] = useState("white");
  let colors = ColorSelector(bgColor);
  function handleOnSelect(event: any) {
    setBgColor(event.target.value);
    console.log(event.target.value);
  }
  return (
    <div
      className={`border m-5 p-3 justify-items-center gap-4 rounded-2xl ${colors.colorContainer} ${colors.colorBorder} shadow-xl backdrop-blur-md`}
    >
      <h2 className="text-2xl text-gray-800 text-bold">Nueva Categoria</h2>
      <div className={"flex gap-3 m-2 text-center text-gray-800 "}>
        <CategorySelector />
        <div className="gap-3 text-gray-800">
          <label className="text-bold">Monto presupuestado</label>
          <input
            type="number"
            name="category-limit"
            className="border rounded-md text-cente w-[70%] h-6 p-1"
            maxLength={6}
          ></input>
        </div>
      </div>
      <div className="text-gray-800 text-center">
        <ColorPicker colorSelected={bgColor} onChange={handleOnSelect} />
      </div>
      <div className="grid w-100 text-gray-800">
        <label className="text-bold">Descripcion de la categoria</label>
        <input
          type="text"
          name="category-description"
          className="border rounded-md"
        ></input>
      </div>
      <Button color="red" text="Eliminar" icon={<FaBan />} onclick={onClick} />
    </div>
  );
}
