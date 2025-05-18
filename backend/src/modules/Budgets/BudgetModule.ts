import { DIContainer } from "rsdi";
import BudgetsController from "./controller/budgetController.ts";
import BudgetRepository from "./repository/budgetRepository.ts";
import BudgetService from "./service/BudgetService.ts";
import type { Application } from "express";
import BudgetModel from "./model/BudgetModel.ts";

export type AppDiContainer = ReturnType<typeof budgetsContainer>;

export function budgetsContainer() {
  return new DIContainer()
    .add("budgetModel", () => BudgetModel)
    .add(
      "budgetsRepository",
      ({ budgetModel }) => new BudgetRepository(budgetModel)
    )
    .add(
      "budgetService",
      ({ budgetsRepository }) => new BudgetService(budgetsRepository)
    )
    .add(
      "budgetsController",
      ({ budgetService }) => new BudgetsController(budgetService)
    );
}

export default function initBudgetModule(
  app: Application,
  container: AppDiContainer
) {
  const controller = container.get("budgetsController");
  controller.configureRoutes(app);
}
