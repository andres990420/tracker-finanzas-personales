import { DIContainer } from "rsdi";
import { budgetsContainer } from "../modules/Budgets/BudgetModule.ts";
import type { AppDiContainer } from "../modules/Budgets/BudgetModule.ts";


export default function configureDI(): AppDiContainer {
  return new DIContainer()
    .extend(budgetsContainer);
}
