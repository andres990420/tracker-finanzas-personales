interface Promps{
  onChangeHandle : (event: any)=> void
}

export default function CategorySelector(promps: Promps) {
  const { onChangeHandle} = promps

  return (
    <div className="gap-3 p-1">
      <label className="font-bold">Categoria</label>
      <select
        className="border rounded-md text-center truncate"
        name="category-type"
        required
        onChange={onChangeHandle}
      >
        <option selected disabled value={''} >Selecciona una categoria</option>
        <option value={"food"}>Comida</option>
        <option value={"transportation"}>Trasnporte</option>
      </select>
    </div>
  );
}
