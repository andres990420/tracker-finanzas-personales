import { FaBan, FaCheckCircle, FaPlus } from "react-icons/fa";
import Button from "../../UI/Button";
import BudgetFormCategory from "./BudgetFormCategory";
import { useState } from "react";
import CategorySelector from "./CategorySelector";

interface Promps {
  closeForm: () => void;
}

interface categoriesList {
  id: number;
  categoryType?: string;
  categoryDescription?: string;
  categoryColor?: string;
  categoryLimit?: string;
}

export default function BudgetForm(promps: Promps) {
  const { closeForm } = promps;
  const [budgetName, setBudgetName] = useState<string>("");
  const [categoryType, setCategoryType] = useState<string[]>([]);
  const [categoryLimit, setCategoryLimit] = useState<string[]>([]);
  const [categoryColor, setCategoryColor] = useState<string[]>([]);
  const [categoryDescription, setcategoryDescription] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<categoriesList[]>([{ id: 0 }]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(
      JSON.stringify({
        "budget-name": budgetName,
        "category-type": categoryType,
        "category-limit": categoryLimit,
        "category-color": categoryColor,
        "category-description": categoryDescription,
      })
    );
    try {
      await fetch("http://localhost:4000/budgets/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          "budget-name": budgetName,
          "category-type": categoryType,
          "category-limit": categoryLimit,
          "category-color": categoryColor,
          "category-description": categoryDescription,
        }),
      });
    } catch (error) {
      throw console.error(error);
    }
    closeForm();
  }

  return (
    <form className="p-1 m-1" onSubmit={handleSubmit}>
      <div className="text-center text-gray-800 p-1 m-1">
        <label className="my-2 text-2xl font-bold">
          Nombre del Presupuesto
        </label>
        <input
          required
          type="text"
          name="budget-name"
          className="border rounded-md mx-y p-2 h-6 text-center uppercase"
          maxLength={15}
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
