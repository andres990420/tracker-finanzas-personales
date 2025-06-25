interface Promps {
  isActive: boolean;
}

export default function Loader(promps: Promps) {
  const { isActive } = promps;
  return (
    <div className={`w-[100%] h-[100%] relative justify-items-center ${
        !isActive && "hidden"
      }`}>
    <iframe
      className={`h-100 `}
      src="/SpinLoad.svg"
    ></iframe>
    </div>
  );
}
