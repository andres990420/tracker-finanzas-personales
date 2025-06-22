import { FaBan } from "react-icons/fa";
import Button from "../../UI/Button";
import ColorPicker from "../../UI/ColorPicker";
import { useState } from "react";
import { ColorSelector } from "../../../utils/utils";

interface Promps {
  onClick: (event: any) => void;
  id: number;
  setCategoryLimit: (event: any, id:number)=> void
  setCategoryColor: (event: any, id:number)=> void
  setCategoryDescription: (event: any, id:number)=> void
  categorySelector: React.ReactNode
}

export default function BudgetFormCategory(promps: Promps) {
  const { onClick, id, setCategoryColor, setCategoryLimit, setCategoryDescription, categorySelector } = promps;
  const [bgColor, setBgColor] = useState("white");
  let colors = ColorSelector(bgColor);
  function handleOnSelect(event: any) {
    setBgColor(event.target.value);
    setCategoryColor(event, id)
  }
  return (
    <div
      className={`border my-2 p-2 gap-4 rounded-2xl shadow-xl backdrop-blur-md ${colors.colorContainer} ${colors.colorBorder}`}
    >
      <div className="h-15 p-1 border-gray-800 border-b flex justify-between">
        <h3 className="text-xl text-gray-800 font-bold">Nueva Categoria</h3>
        {id === 0 ? (
          ""
        ) : (
          <Button
            color="red"
            icon={<FaBan />}
            type="button"
            onClick={onClick}
          ></Button>
        )}
      </div>

      <div className={`m-1 text-center text-gray-800 p-1`}>
        <div className="flex justify-between gap-1">
          {categorySelector}
          <ColorPicker colorSelected={bgColor} onChange={handleOnSelect} />
          <div className="text-gray-800 p-1">
            <label className="font-bold">Monto $</label>
            <input
              required
              type="number"
              name="category-limit"
              className="border rounded-md text-center w-[80%] h-6 p-2"
              max={9999999}
              maxLength={6}
              onChange={(e)=>setCategoryLimit(e, id)}
            ></input>
          </div>
        </div>

        <div className="p-2 grid text-gray-800">
          <label className="font-bold">Descripcion de la categoria</label>
          <textarea
            name="category-description"
            className="border rounded-md p-2 h-25"
            maxLength={150}
            onChange={(e)=>setCategoryDescription(e, id)}
            defaultValue={''}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
