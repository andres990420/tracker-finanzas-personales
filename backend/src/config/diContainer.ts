import { DIContainer } from "rsdi";
import { budgetsContainer } from "../modules/Budgets/budgetModule.ts";
import { userContainer } from "../modules/User/userModule.ts";
import { movementContainer } from "../modules/Movements/movementModule.ts";

export type AppContainer = ReturnType<typeof configureDI>

export default function configureDI(){
  const container = new DIContainer()
  
  userContainer(container);
  budgetsContainer(container);
  movementContainer(container);

  return container
}
