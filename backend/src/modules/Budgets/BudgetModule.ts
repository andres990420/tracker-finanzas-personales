import { DIContainer } from "rsdi";
import BudgetsController from "./controller/budgetsController.ts";
import BudgetsRepository from "./repository/budgetsRepository.ts";
import BudgetsService from "./service/BudgetsService.ts";
import type { Application } from "express";
import BudgetModel from "./model/BudgetsModel.ts";

export type AppDiContainer = ReturnType<typeof budgetsContainer>;

export function budgetsContainer() {
  return new DIContainer()
    .add("budgetModel", ()=>(BudgetModel))
    .add("budgetsRepository", ({budgetModel}) => new BudgetsRepository(budgetModel))
    .add(
      "budgetService",
      ({ budgetsRepository }) => new BudgetsService(budgetsRepository)
    )
    .add(
      "budgetsController",
      ({ budgetService }) => new BudgetsController(budgetService)
    );
}

export default function initBudgetModule(app: Application, container: AppDiContainer) {
  const controller = container.get("budgetsController");
  controller.configureRoutes(app);
}
