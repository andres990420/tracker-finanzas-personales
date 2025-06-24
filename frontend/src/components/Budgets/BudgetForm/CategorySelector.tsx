import { budgetsCategories } from "../../../assets/categories";

interface Promps {
  onChangeHandle: (event: any) => void;
}

export default function CategorySelector(promps: Promps) {
  const { onChangeHandle } = promps;
  const budgetCategories = budgetsCategories;

  return (
    <div className="gap-3 p-1">
      <label className="font-bold">Categoria</label>
      <select
        className="border rounded-md text-center truncate"
        name="category-type"
        required
        onChange={onChangeHandle}
      >
        <option selected disabled value={""}>
          Selecciona una categoria
        </option>
        {budgetCategories.map((category) => (
          <option key={category[1]} value={category[1]}>{category[0]}</option>
        ))}
      </select>
    </div>
  );
}
