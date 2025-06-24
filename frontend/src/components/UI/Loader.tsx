interface Promps {
  isActive: boolean;
}

export default function Loader(promps: Promps) {
  const { isActive } = promps;
  return (
    <iframe
      className={`w-full h-full justify-self-center align-middle ${
        !isActive && "hidden"
      }`}
      src="/Loading_2.gif"
    ></iframe>
  );
}
