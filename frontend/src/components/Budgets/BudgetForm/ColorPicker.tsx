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
      <div className="p-1">
        <label className="p-2 font-bold">Color de categoria</label>
        <select
          value={colorSelected}
          onChange={onChange}
          name={"category-color"}
          className={
            "text-center rounded-2xl border z-10 border-black"
          }
        >
          <option unselectable="on">Selecciona un color</option>
          {colors.map((color) => (
            <option
              key={color}
              className={`text-bold ${
                ColorSelector(color).colorContainer
              }`}
              value={color}
            >
              {ColorSelector(color).colorName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
