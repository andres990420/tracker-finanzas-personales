interface Promps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  eventTrigger: () => void;
  activeState: boolean
  setActiveState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SwitchButton(promps: Promps) {
  const { eventTrigger, activeState, setActiveState} = promps;
  function onClickEvent() {
    eventTrigger();
    setActiveState(!activeState)
  }
  return (
    <button
      className={`rounded-full border h-10 w-20 p-1 relative transition-all duration-500 shadow-xl ${
        activeState ? "border-blue-500 bg-blue-600" : "border-blue-300 bg-blue-300"
      }`}
      onClick={onClickEvent}
      type="button"
    >
      <div
        className={`rounded-full bg-white h-8 w-8 absolute bottom-1 border transition-all duration-500 ${
          activeState ? "border-blue-500 left-10" : "border-blue-300"
        }`}
      ></div>
    </button>
  );
}
