import { FaBan, FaCheckCircle, FaPlus } from "react-icons/fa";
import Button from "../../UI/Button";
import BudgetFormCategory from "./BudgetFormCategory";
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import TooltipButton from "../../UI/TooltipButton";
import { tooltipsInfoBudgetForm } from "../../../utils/tooltipsInfo";
import type { IBudgets, ICategory } from "../../../types/models";

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
  budgetToEdit?: IBudgets;
}

interface categoriesList {
  id: number;
  categoryType?: string;
  categoryDescription?: string;
  categoryColor?: string;
  categoryLimit?: string;
}

export default function BudgetForm(promps: Promps) {
  const { closeForm, handleSubmit, budgetToEdit } = promps;
  const tooltipInfo = tooltipsInfoBudgetForm;
  const [budgetName, setBudgetName] = useState<string>(() =>
    budgetToEdit ? budgetToEdit.name : ""
  );
  const [categoryType, setCategoryType] = useState<string[]>([]);
  const [categoryLimit, setCategoryLimit] = useState<string[]>([]);
  const [categoryColor, setCategoryColor] = useState<string[]>([]);
  const [categoryDescription, setcategoryDescription] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<ICategory[]>(() => {
    return budgetToEdit
      ? budgetToEdit.categories
      : [
          {
            id: "0",
            color: "",
            currentAmount: 0,
            description: "",
            maxAmount: 0,
            type: " ",
            transactions: [],
          },
        ];
  });

  function handleCategoriesInfo(value: string, id: string, element: string) {
    const categoryToModified = categoriesList.filter(
      (category) => category.id === id
    )[0];
    switch (element) {
      case "category-type":
        categoryToModified.type = value;
        break;
      case "category-limit":
        categoryToModified.maxAmount = Number(value);
        break;
      case "category-color":
        categoryToModified.color = value;
        break;
      case "category-description":
        categoryToModified.description = value;
        break;
    }

    const newList = categoriesList.slice();

    newList.find((category) => {
      if (category.id === categoryToModified.id) {
        category.color = categoryToModified.color;
        category.description = categoryToModified.description;
        category.maxAmount = categoryToModified.maxAmount;
        category.type = categoryToModified.type;
      }
    });
    setCategoriesList(newList);
    setCategoryLimit(newList.map((category) => String(category.maxAmount)));
    setCategoryType(newList.map((category) => category.type));
    setCategoryColor(newList.map((category) => category.color));
    setcategoryDescription(newList.map((category) => category.description));
  }

  function handleDeleteCategorie(id: string) {
    const categoryDeleted = categoriesList.filter(
      (category) => category.id === id
    )[0];

    const newList = categoriesList.filter((category) => category.id !== id);

    setCategoriesList(newList);
    setcategoryDescription(
      categoryDescription.filter(
        (category) => category !== categoryDeleted.description
      )
    );
    setCategoryColor(
      categoryColor.filter((category) => category !== categoryDeleted.color)
    );
    setCategoryLimit(
      categoryLimit.filter(
        (category) => category !== String(categoryDeleted.maxAmount)
      )
    );
    setCategoryType(
      categoryType.filter((category) => category !== categoryDeleted.type)
    );
  }

  function handleNewCategorie() {
    const newId = Math.random() * 1000
    setCategoriesList([
      ...categoriesList,
      {
        id: String(newId),
        color: "",
        currentAmount: 0,
        description: "",
        maxAmount: 0,
        type: " ",
        transactions: [],
      },
    ]);
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
          value={budgetToEdit?.name}
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
              category={category}
              setCategoryDescription={handleCategoriesInfo}
              setCategoryLimit={handleCategoriesInfo}
              setCategoryColor={handleCategoriesInfo}
              setCategoryType={handleCategoriesInfo}
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
