export function ColorSelector(color: string) {
  let colorProgressBar;
  let colorContainer;
  let colorName;
  let colorBorder;
  switch (color) {
    case "red":
      colorProgressBar = "bg-red-500/80";
      colorContainer = "bg-red-400/40";
      colorBorder = "border-red-300"
      colorName = "Rojo"
      break;
    case "orange":
      colorProgressBar = "bg-orange-500/80";
      colorContainer = "bg-orange-400/40";
      colorBorder = "border-orange-300"
      colorName = "Naranja"
      break;
    case "amber":
      colorProgressBar = "bg-amber-500/80";
      colorContainer = "bg-amber-400/40";
      colorBorder = "border-amber-300"
      colorName = "Ambar"
      break;
    case "yellow":
      colorProgressBar = "bg-yellow-500/80";
      colorContainer = "bg-yellow-400/40";
      colorBorder = "border-yellow-300"
      colorName = "Amarillo"
      break;
    case "lime":
      colorProgressBar = "bg-lime-500/80";
      colorContainer = "bg-lime-400/40";
      colorBorder = "border-lime-300"
      colorName = "Lima"
      break;
    case "green":
      colorProgressBar = "bg-green-500/80";
      colorContainer = "bg-green-400/40";
      colorBorder = "border-green-300"
      colorName = "Verde"
      break;
    case "emerald":
      colorProgressBar = "bg-emerald-500/80";
      colorContainer = "bg-emerald-400/40";
      colorBorder = "border-emerald-300"
      colorName = "Esmeralda"
      break;
    case "teal":
      colorProgressBar = "bg-teal-500/80";
      colorContainer = "bg-teal-400/40";
      colorBorder = "border-teal-300"
      colorName = "Teal"
      break;
    case "cyan":
      colorProgressBar = "bg-cyan-500/80";
      colorContainer = "bg-cyan-400/40";
      colorBorder = "border-cyan-300"
      colorName = "Cian"
      break;
    case "sky":
      colorProgressBar = "bg-sky-500/80";
      colorContainer = "bg-sky-400/40";
      colorBorder = "border-sky-300"
      colorName = "Cielo"
      break;
    case "blue":
      colorProgressBar = "bg-blue-500/80";
      colorContainer = "bg-blue-400/40";
      colorBorder = "border-blue-300"
      colorName = "Azul"
      break;
    case "indigo":
      colorProgressBar = "bg-indigo-500/80";
      colorContainer = "bg-indigo-400/40";
      colorBorder = "border-indigo-300"
      colorName = "Indigo"
      break;
    case "violet":
      colorProgressBar = "bg-violet-500/80";
      colorContainer = "bg-violet-400/40";
      colorBorder = "border-violet-300"
      colorName = "Violeta"
      break;
    case "purple":
      colorProgressBar = "bg-purple-500/80";
      colorContainer = "bg-purple-400/40";
      colorBorder = "border-purple-300"
      colorName = "Purpura"
      break;
    case "fuchsia":
      colorProgressBar = "bg-fuchsia-500/80";
      colorContainer = "bg-fuchsia-400/40";
      colorBorder = "border-fuchsia-300"
      colorName = "Fucsia"
      break;
    case "pink":
      colorProgressBar = "bg-pink-500/80";
      colorContainer = "bg-pink-400/40";
      colorBorder = "border-pink-300"
      colorName = "Rosado"
      break;
    case "rose":
      colorProgressBar = "bg-rose-500/80";
      colorContainer = "bg-rose-400/40";
      colorBorder = "border-rose-300"
      colorName = "Rosa"
      break;
    case "slate":
      colorProgressBar = "bg-islate-500/80";
      colorContainer = "bg-islate-400/40";
      colorBorder = "border-slate-300"
      colorName = "Slate"
      break;
    case "gray":
      colorProgressBar = "bg-gray-500/80";
      colorContainer = "bg-gray-400/40";
      colorBorder = "border-gray-300"
      colorName = "Gris"
      break;
    case "zinc":
      colorProgressBar = "bg-zinc-500/80";
      colorContainer = "bg-zinc-400/40";
      colorBorder = "border-zinc-300"
      colorName = "Zinc"
      break;
    case "neutral":
      colorProgressBar = "bg-neutral-500/80";
      colorContainer = "bg-neutral-400/40";
      colorBorder = "border-neutral-300"
      colorName = "Neutral"
      break;
    case "stone":
      colorProgressBar = "bg-stone-500/80";
      colorContainer = "bg-stone-400/40";
      colorBorder = "border-stone-300"
      colorName = "Piedra"
      break;
  }

  const finalsColors = {
    'colorProgressBar': colorProgressBar, 
    'colorContainer': colorContainer, 
    'colorName': colorName,
    'colorBorder': colorBorder
  };
  return finalsColors;
}

export const ColorsList = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
  ];