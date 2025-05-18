import { DIContainer } from "rsdi";
import { budgetsContainer } from "../modules/Budgets/budgetModule.ts";
import type { AppDiContainer } from "../modules/Budgets/budgetModule.ts";

export default function configureDI(): AppDiContainer {
  return new DIContainer().extend(budgetsContainer);
}
