import { FaBan } from "react-icons/fa";
import Button from "../../UI/Button";
import ColorPicker from "../../UI/ColorPicker";
import { useEffect, useState } from "react";
import { ColorSelector } from "../../../utils/utils";
import TooltipButton from "../../UI/TooltipButton";
import { tooltipsInfoBudgetForm } from "../../../utils/tooltipsInfo";
import type { ICategory } from "../../../types/models";
import CategorySelector from "./CategorySelector";

interface Promps {
  onClick: (event: any) => void;
  id: string;
  setCategoryLimit: (value: any, id: string, element: string) => void;
  setCategoryColor: (value: any, id: string, element: string) => void;
  setCategoryDescription: (value: any, id: string, element: string) => void;
  setCategoryType: (value: any, id: string, element: string) => void;
  category?: ICategory;
}

export default function BudgetFormCategory(promps: Promps) {
  const {
    onClick,
    id,
    setCategoryColor,
    setCategoryLimit,
    setCategoryDescription,
    setCategoryType,
    category,
  } = promps;
  const [bgColor, setBgColor] = useState(() => {
    return category ? category.color : "white";
  });
  const [categorySelected, setCategorySelected] = useState<string>(() => {
    return category ? category.type : "";
  });

  const tooltipInfo = tooltipsInfoBudgetForm;
  let colors = ColorSelector(bgColor);

  function handleOnCategorySelect(category: string){
    setCategorySelected(category)
    setCategoryType(category, id, "category-type")
  }

  function handleOnColorSelect(color: string) {
    setBgColor(color);
    setCategoryColor(color, id, "category-color");
  }

  useEffect(()=>{
    if(category){
    setCategoryColor(category.color, id, "category-color")
    setCategoryDescription(category.description, id, "category-description")
    setCategoryLimit(category.maxAmount, id, "category-limit")
    setCategoryType(category.type, id, "category-type")
  }
  },[])
  

  return (
    <div
      className={`border my-2 p-2 gap-4 rounded-2xl shadow-xl backdrop-blur-md ${colors.colorContainer} ${colors.colorBorder}`}
    >
      <div className="h-1/3 p-1 border-gray-800 border-b flex justify-between">
        <h3 className="text-xl text-gray-800 font-bold">Nueva Categoria</h3>
        {id === "0" ? (
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

      <div className={`m-1 text-center text-gray-800 p-1 `}>
        <div className="flex justify-between gap-1">
          <ColorPicker colorSelected={bgColor} onChange={handleOnColorSelect} />
          <div className="text-gray-800 p-1">
            <label className="font-bold flex p-1 justify-center">
              Monto
              <TooltipButton
                tooltipId="budgetForm"
                tooltipVariant="info"
                tooltipContent={tooltipInfo.BUDGET_FORM_CATEGORY_AMOUNT}
              />
            </label>
            <input
              required
              type="number"
              name="category-limit"
              className="rounded-md text-center w-[80%] h-[40%] p-1 bg-gray-400/20 font-semibold"
              min={1}
              max={9999999}
              maxLength={6}
              onChange={(e) => setCategoryLimit(e.target.value, id, "category-limit")}
              value={category ? category?.maxAmount : ''}
            ></input>
          </div>
        </div>
        <CategorySelector
                  onChangeHandle={handleOnCategorySelect}
                  categorySelected={categorySelected}
                />
        <div className="p-2 grid text-gray-800">
          <label className="font-bold flex justify-center">
            Descripcion de la categoria
            <TooltipButton
              tooltipId="budgetForm"
              tooltipVariant="info"
              tooltipContent={tooltipInfo.BUDGET_FORM_CATEGORY_DESCRIPTION}
            />
          </label>
          <textarea
            name="category-description"
            className="bg-gray-400/30 rounded-md p-2 h-25 text-black"
            maxLength={150}
            onChange={(e) => setCategoryDescription(e.target.value, id, "category-description")}
            value={category?.description}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
