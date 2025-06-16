export default function CategorySelector() {
  return (
    <div className="gap-3 p-1">
      <label className="font-bold">Categoria</label>
      <select className="border rounded-md text-center" name="category-type">
        <option value={"food"}>Comida</option>
        <option value={"transportation"}>Trasnporte</option>
      </select>
    </div>
  );
}
