import "./App.css";
import Inicio from "./pages/Home";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
  return (
    <>
      <div className="flex">
        <div className="h-screen">
          <SideMenu />
        </div>
        <div className="h-screen w-screen bg-gray-100 overflow-x-hidden">
          <Inicio />
        </div>
      </div>
    </>
  );
}

export default App;
