import data from "../../assets/data.json";

export default function TableMovements() {
  
    const stylesIncomes = "font-bold border text-center bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
    const stylesExpensive = "font-bold border text-center bg-red-100/20 text-red-800 border-red-300 hover:bg-red-200"
    return (
    <table className="table-auto w-full border-collapse border">
      <thead className="bg-gray-800 text-white border-b font-bold text-xl border-gray-600">
        <tr className="text-center">
          <th className="px-4 py-2">Categoria</th>
          <th className="px-4 py-2">Descripcion</th>
          <th className="px-4 py-2">Monto</th>
          <th className="px-4 py-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {data.map((elements) => (
          <tr
            key={elements.id}
            className={elements.type == "ingreso"? stylesIncomes: stylesExpensive}
          >
            <td key={`${elements.id}category"`} className="border px-2 py-1">
              {elements.category}
            </td>
            <td key={`${elements.id}-descrption"`} className="border px-2 py-1">
              {elements.description}
            </td>
            <td key={`${elements.id}-amount"`} className="border px-2 py-1">
              {elements.amount} $
            </td>
            <td key={`${elements.id}-createdAt"`} className="border px-2 py-1">
              {elements.created_at}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
