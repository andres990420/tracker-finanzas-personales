import { FaBan, FaCheckCircle, FaPlus } from "react-icons/fa";
import Button from "../../UI/Button";
import BudgetFormCategory from "./BudgetFormCategory";
import { useState } from "react";

interface Promps{
  cancelForm: () => void
}

export default function BudgetForm(promps : Promps) {
  const{cancelForm} = promps

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
    <form
      className=""
      action={"http://localhost:4000/budgets/create"}
      method="POST"
    >
      <div className="text-center text-gray-800 p-1 m-1">
        <label className="my-2 text-2xl font-bold">Nombre del Presupuesto</label>
        <input
          type="text"
          name="budget-name"
          className="border rounded-md mx-y p-2 h-6 text-center uppercase"
          maxLength={15}
        ></input>
      </div>
      <div className="border border-gray-200 p-2 rounded-2xl shadow-md">
        <div>
          {categoriesList.map((category) => (
            <BudgetFormCategory
              key={category.id}
              onClick={() => handleDeleteCategorie(category.id)}
            />
          ))}
        </div>
        <div className="justify-items-center">
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
      <div className="mt-5 gap-2 justify-items-center">
        <Button color="violet" type="submit" icon={<FaCheckCircle />}>
          Crear Presupuesto
        </Button>
        <Button color="red" type="button" onClick={cancelForm} icon={<FaBan />}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
