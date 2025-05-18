import { FaCheckCircle, FaPlus } from "react-icons/fa";
import Buttons from "../../Buttons";
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
    const newId = categoriesList.length > 0 ? categoriesList[categoriesList.length - 1].id + 1 : 0;
    setCategoriesList([...categoriesList, { id: newId }]);
  }



  return (
    <form className="border rounded-3xl bg-gray-400/30 border-gray-400/40 shadow-xl" action={"http://localhost:3000/budgets"} method="POST">
      <h1 className="text-center text-gray-800 text-3xl font-bold m-2">
        Nuevo Presupuesto
      </h1>
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
        <Buttons color="blue" text="Agregar categoria" icon={<FaPlus />} onclick={handleNewCategorie}/>
      </div>
      <div className="justify-items-center">
        <Buttons color="violet" text="Crear Presupuesto" type={"submit"} icon={<FaCheckCircle />}/>
      </div>
    </form>
  );
}
