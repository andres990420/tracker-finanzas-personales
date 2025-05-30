import { FaCheckCircle, FaPlus } from "react-icons/fa";
import Button from "../../UI/Button";
import BudgetFormCategory from "./BudgetFormCategory";
import { useState } from "react";

export default function BudgetForm() {
  const [categoriesList, setCategoriesList] = useState<{ id: number }[]>([
    { id: 0 },
  ]);

  function handleDeleteCategorie(id: number) {
    setCategoriesList(categoriesList.filter((category) => category.id !== id));
  }

  function handleNewCategorie() {
    const newId =
      categoriesList.length > 0
        ? categoriesList[categoriesList.length - 1].id + 1
        : 0;
    setCategoriesList([...categoriesList, { id: newId }]);
  }

  return (
    <form className="" action={"http://localhost:4000/budgets/create"} method="POST">
      <div className="text-center text-gray-800 p-1">
        <label className="mx-2">Nombre del Presupuesto</label>
        <input
          type="text"
          name="budget-name"
          className="border rounded-md mx-2 p-2 h-6"
        ></input>
      </div>
      <div>
        {categoriesList.map((category) => (
          <BudgetFormCategory
            key={category.id}
            onClick={() => handleDeleteCategorie(category.id)}
          />
        ))}
      </div>
      <div className="justify-items-center">
        <Button color="blue" type="button" icon={<FaPlus />} onClick={handleNewCategorie}>
          Agregar Categoria
        </Button>
      </div>
      <div className="justify-items-center">
        <Button color="violet" type="submit" icon={<FaCheckCircle />}>
          Crear Presupuesto
        </Button>
      </div>
    </form>
  );
}
