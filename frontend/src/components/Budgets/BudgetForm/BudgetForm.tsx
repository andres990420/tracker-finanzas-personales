import { FaBan, FaCheckCircle, FaPlus } from "react-icons/fa";
import Button from "../../UI/Button";
import BudgetFormCategory from "./BudgetFormCategory";
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import TooltipButton from "../../UI/TooltipButton";
import { tooltipsInfoBudgetForm } from "../../../utils/tooltipsInfo";

interface Promps {
  closeForm: () => void;
  handleSubmit: (
    event: any,
    budgetName: string,
    categoryType: string[],
    categoryLimit: string[],
    categoryColor: string[],
    categoryDescription: string[]
  ) => void;
}

interface categoriesList {
  id: number;
  categoryType?: string;
  categoryDescription?: string;
  categoryColor?: string;
  categoryLimit?: string;
}

export default function BudgetForm(promps: Promps) {
  const { closeForm, handleSubmit} = promps;
  const tooltipInfo = tooltipsInfoBudgetForm
  const [budgetName, setBudgetName] = useState<string>("");
  const [categoryType, setCategoryType] = useState<string[]>([]);
  const [categoryLimit, setCategoryLimit] = useState<string[]>([]);
  const [categoryColor, setCategoryColor] = useState<string[]>([]);
  const [categoryDescription, setcategoryDescription] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<categoriesList[]>([
    { id: 0 },
  ]);

  function handleCategoriesInfo(event: any, id: number) {
    const categoryToModified = categoriesList.filter(
      (category) => category.id === id
    )[0];

    switch (event.target.name) {
      case "category-type":
        categoryToModified.categoryType = event.target.value;
        break;
      case "category-limit":
        categoryToModified.categoryLimit = event.target.value;
        break;
      case "category-color":
        categoryToModified.categoryColor = event.target.value;
        break;
      case "category-description":
        categoryToModified.categoryDescription = event.target.value;
        break;
    }

    const newList = categoriesList.slice();

    newList.find((category) => {
      if (category.id === categoryToModified.id) {
        category.categoryColor = categoryToModified.categoryColor;
        category.categoryDescription = categoryToModified.categoryDescription;
        category.categoryLimit = categoryToModified.categoryLimit;
        category.categoryType = categoryToModified.categoryType;
      }
    });
    setCategoriesList(newList);
    setCategoryLimit(
      newList.map((category) => category.categoryLimit as string)
    );
    setCategoryType(newList.map((category) => category.categoryType as string));
    setCategoryColor(
      newList.map((category) => category.categoryColor as string)
    );
    setcategoryDescription(
      newList.map((category) => category.categoryDescription as string)
    );
  }

  function handleDeleteCategorie(id: number) {
    const categoryDeleted = categoriesList.filter(
      (category) => category.id === id
    )[0];

    const newList = categoriesList.filter((category) => category.id !== id);

    setCategoriesList(newList);
    setcategoryDescription(
      categoryDescription.filter(
        (category) => category !== categoryDeleted.categoryDescription
      )
    );
    setCategoryColor(
      categoryColor.filter(
        (category) => category !== categoryDeleted.categoryColor
      )
    );
    setCategoryLimit(
      categoryLimit.filter(
        (category) => category !== categoryDeleted.categoryLimit
      )
    );
    setCategoryType(
      categoryType.filter(
        (category) => category !== categoryDeleted.categoryType
      )
    );
  }

  function handleNewCategorie() {
    const newId =
      categoriesList.length > 0
        ? categoriesList[categoriesList.length - 1].id + 1
        : 0;
    setCategoriesList([...categoriesList, { id: newId }]);
  }

  

  return (
    <form
      className="p-1 m-1"
      onSubmit={(e) =>
        handleSubmit(
          e,
          budgetName,
          categoryType,
          categoryLimit,
          categoryColor,
          categoryDescription
        )
      }
    >
      <div className="text-center text-gray-800 p-1 grid justify-center m-1 gap-1">
        <label className="text-2xl font-bold flex ">
          Nombre del Presupuesto
          <TooltipButton
            tooltipId="budgetForm"
            tooltipContent={tooltipInfo.BUDGET_FORM_BUDGET_NAME}
            tooltipVariant="info"
          />
        </label>
        <input
          required
          type="text"
          name="budget-name"
          className="bg-gray-400/20 rounded-md p-2 h-6 text-center w-[100%] font-semibold"
          maxLength={40}
          onChange={(e) => setBudgetName(e.target.value)}
        ></input>
      </div>
      <div className=" p-2 border-b border-t border-gray-400">
        <div>
          {categoriesList.map((category) => (
            <BudgetFormCategory
              id={category.id}
              key={category.id}
              onClick={() => handleDeleteCategorie(category.id)}
              setCategoryDescription={handleCategoriesInfo}
              setCategoryLimit={handleCategoriesInfo}
              setCategoryColor={handleCategoriesInfo}
              categorySelector={
                <CategorySelector
                  onChangeHandle={(e) => handleCategoriesInfo(e, category.id)}
                />
              }
            />
          ))}
        </div>
        <div className="justify-items-end">
          <Button
            color="blue"
            type="button"
            icon={<FaPlus />}
            onClick={handleNewCategorie}
          >
            Agregar Categoria
          </Button>
        </div>
      </div>
      <div className="mt-5 flex gap-1 justify-items-center justify-center">
        <Button color="violet" type="submit" icon={<FaCheckCircle />}>
          Crear Presupuesto
        </Button>
        <Button color="red" type="button" onClick={closeForm} icon={<FaBan />}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
