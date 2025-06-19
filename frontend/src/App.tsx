import "./App.css";
import Home from "./pages/Home";
import SideMenu from "./components/SideMenu/SideMenu";
import Budgets from "./pages/Budgets";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  return (
    <>
      <div className="flex">
        <div className="h-screen">
          <SideMenu />
        </div>
        <div className="h-screen w-screen bg-gray-100 overflow-x-hidden">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/",
    Component: ProtectedRoutes, 
    children: [{
      path: "/budgets",
      Component: Budgets
    }]
  },
  {
    path: "goals",
    // Component: Goals
  },
]);

export default App;
