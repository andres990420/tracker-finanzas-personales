import { ColorSelector, ColorsList } from "../../../utils/utils";

interface Promps {
  onChange: (event: any) => void;
  colorSelected: string;
}

export default function ColorPicker(promps: Promps) {
  const { onChange, colorSelected } = promps;

  const colors = ColorsList;
  return (
    <>
      <label className="p-2">Color de la categoria</label>
      <select
        value={colorSelected}
        onChange={onChange}
        name={"categorie-color"}
        className={"w-[50%] text-center  border-white text-black rounded-2xl border z-10"}
      >
        <option unselectable="on">Selecciona un color</option>
        {colors.map((color) => (
          <option key={color}
            className={`text-bold text-black ${ColorSelector(color).colorContainer}`}
            value={color}
          >
            {ColorSelector(color).colorName}
          </option>
        ))}
      </select>
    </>
  );
}
