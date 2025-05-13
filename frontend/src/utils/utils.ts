export function ColorSelector(color: string) {
  let colorProgressBar;
  let colorContainer;
  let finalsColors;
  switch (color) {
    case "red":
      colorProgressBar = "bg-red-500/80";
      colorContainer = "bg-red-400/40";
      break;
    case "orange":
      colorProgressBar = "bg-orange-500/80";
      colorContainer = "bg-orange-400/40";
      break;
    case "amber":
      colorProgressBar = "bg-amber-500/80";
      colorContainer = "bg-amber-400/40";
      break;
    case "yellow":
      colorProgressBar = "bg-yellow-500/80";
      colorContainer = "bg-yellow-400/40";
      break;
    case "lime":
      colorProgressBar = "bg-lime-500/80";
      colorContainer = "bg-lime-400/40";
      break;
    case "green":
      colorProgressBar = "bg-green-500/80";
      colorContainer = "bg-green-400/40";
      break;
    case "esmerald":
      colorProgressBar = "bg-esmerald-500/80";
      colorContainer = "bg-esmerald-400/40";
      break;
    case "teal":
      colorProgressBar = "bg-teal-500/80";
      colorContainer = "bg-teal-400/40";
      break;
    case "cyan":
      colorProgressBar = "bg-cyan-500/80";
      colorContainer = "bg-cyan-400/40";
      break;
    case "sky":
      colorProgressBar = "bg-sky-500/80";
      colorContainer = "bg-sky-400/40";
      break;
    case "blue":
      colorProgressBar = "bg-blue-500/80";
      colorContainer = "bg-blue-400/40";
      break;
    case "indigo":
      colorProgressBar = "bg-indigo-500/80";
      colorContainer = "bg-indigo-400/40";
      break;
    case "violet":
      colorProgressBar = "bg-violet-500/80";
      colorContainer = "bg-violet-400/40";
      break;
    case "purple":
      colorProgressBar = "bg-purple-500/80";
      colorContainer = "bg-purple-400/40";
      break;
    case "fuchsia":
      colorProgressBar = "bg-fuchsia-500/80";
      colorContainer = "bg-fuchsia-400/40";
      break;
    case "pink":
      colorProgressBar = "bg-pink-500/80";
      colorContainer = "bg-pink-400/40";
      break;
    case "rose":
      colorProgressBar = "bg-rose-500/80";
      colorContainer = "bg-rose-400/40";
      break;
    case "slate":
      colorProgressBar = "bg-islate-500/80";
      colorContainer = "bg-islate-400/40";
      break;
    case "gray":
      colorProgressBar = "bg-gray-500/80";
      colorContainer = "bg-gray-400/40";
      break;
    case "zinc":
      colorProgressBar = "bg-zinc-500/80";
      colorContainer = "bg-zinc-400/40";
      break;
    case "neutral":
      colorProgressBar = "bg-neutral-500/80";
      colorContainer = "bg-neutral-400/40";
      break;
    case "stone":
      colorProgressBar = "bg-stone-500/80";
      colorContainer = "bg-stone-400/40";
      break;
  }

  finalsColors = [colorProgressBar, colorContainer];
  return finalsColors;
}
