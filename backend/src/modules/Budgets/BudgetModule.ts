import { DIContainer } from "rsdi";
import BudgetsController from "./controller/budgetController.ts";
import BudgetRepository from "./repository/budgetRepository.ts";
import BudgetService from "./service/BudgetService.ts";
import type { Application } from "express";
import BudgetModel from "./model/budgetModel.ts";
import CategoryModel from "./model/categoryModel.ts";
import CategoryRepository from "./repository/categoryRepository.ts";
import CategoryService from "./service/categoryService.ts";

export type AppDiContainer = ReturnType<typeof budgetsContainer>;

export function budgetsContainer() {
  return new DIContainer()
    .add("budgetModel", () => BudgetModel)
    .add("categoryModel", () => CategoryModel)
    .add(
      "budgetsRepository",
      ({ budgetModel }) => new BudgetRepository(budgetModel)
    )
    .add(
      "categoryRepository",
      ({ categoryModel }) => new CategoryRepository(categoryModel)
    )
    .add(
      "budgetService",
      ({ budgetsRepository }) => new BudgetService(budgetsRepository)
    )
    .add(
      "categoryService",
      ({ categoryRepository }) => new CategoryService(categoryRepository)
    )
    .add(
      "budgetsController",
      ({ budgetService, categoryService }) =>
        new BudgetsController(budgetService, categoryService)
    );
}

export default function initBudgetModule(
  app: Application,
  container: AppDiContainer
) {
  const controller = container.get("budgetsController");
  controller.configureRoutes(app);
}
