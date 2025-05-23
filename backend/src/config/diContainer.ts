import { DIContainer } from "rsdi";
import { budgetsContainer } from "../modules/Budgets/budgetModule.ts";
import { userContainer } from "../modules/User/userModule.ts";
import { transactionContainer } from "../modules/Movements/transactionModule.ts";
import { categoryContainer } from "../modules/Category/categoryModule.ts";

export type AppContainer = ReturnType<typeof configureDI>;

export default function configureDI() {
  const container = new DIContainer();

  userContainer(container);
  categoryContainer(container);
  budgetsContainer(container);
  transactionContainer(container);

  return container;
}
