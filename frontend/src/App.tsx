import "./App.css";
import Transactions from "./pages/Transactions";
import SideMenu from "./components/SideMenu/SideMenu";
import Budgets from "./pages/Budgets";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="h-screen">
        <div className="h-[75px]">
          <SideMenu />
        </div>
        <div className="h-full">
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
    children: [
      {
        path: "/budgets",
        Component: Budgets,
      },
      {
        path: "/transactions",
        Component: Transactions,
      },
    ],
  },
]);

export default App;
