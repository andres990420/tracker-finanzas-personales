import BudgetsController from "./controller/budgetController.ts";
import BudgetRepository from "./repository/budgetRepository.ts";
import BudgetService from "./service/BudgetService.ts";
import type { Application } from "express";
import BudgetModel from "./model/budgetModel.ts";
import { type AppContainer } from "../../config/diContainer.ts";

export function budgetsContainer(container: AppContainer) {
  return container
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
      ({ budgetService }) =>
        new BudgetsController(budgetService)
    );
}

export default function initBudgetModule(
  app: Application,
  container: Object & { get(key: "budgetsController"): BudgetsController }
) {
  const controller = container.get("budgetsController");
  controller.configureRoutes(app);
}
