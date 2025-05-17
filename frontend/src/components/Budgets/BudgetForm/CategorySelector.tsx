export default function CategorySelector() {
  return (
    <div className="gap-3">
      <label className="text-bold">Clasificasion</label>
      <select className="border rounded-md text-center text-black border-white" name="categorie-type">
        <option value={"food"}>Comida</option>
        <option value={"transportation"}>Trasnporte</option>
      </select>
    </div>
  );
}
