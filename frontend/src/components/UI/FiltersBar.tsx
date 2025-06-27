export default function FilterBar() {

  return (
    <>
      <div className="flex gap-2 justify-center items-center h-full">
        <div className="gap-1 h-full w-2/4 place-content-center">
          <div className="flex p-1 w-full justify-between gap-2">
            <p className="text-sm font-bold">Ingresos</p>
            <input checked type="checkbox"/>
          </div>
          <div className="flex p-1 w-full justify-between gap-2">
            <p className="text-sm font-bold">Egresos</p>
            <input checked type="checkbox"/>
          </div>
        </div>
        <div className="h-full w-2/4 place-content-center">
          <select className="rounded-lg border py-1 border-gray-300">
            <option className="text-gray-400" value={''}>Seleccione una categoria</option>
            <option>Alimentacion y transporte</option>
          </select>
        </div>
        <div className="h-full w-2/4 place-content-center">
          <input className="border rounded-md p-1 border-gray-300" placeholder="Buscar..." type="text"></input>
        </div>
      </div>
    </>
  );
}
