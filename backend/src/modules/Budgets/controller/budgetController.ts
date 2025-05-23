import type { Application, Request, Response } from "express";
import BudgetService from "../service/BudgetService.ts";
import { extractingCategoriesToBeSave, formToEntityBudget, modelToEntityBudget } from "../utils/budgetMapper.ts";
import data from "../utils/budget.json" with { type: "json"}
import CategoryService from "../../Category/service/categoryService.ts";
import { ObjectId } from "mongoose";

export default class BudgetsController {
  private ROUTE_BASE: string = "/budgets";
  private budgetService: BudgetService;
  private categoryService: CategoryService

  constructor(budgetService: BudgetService, categoryService: CategoryService) {
    this.budgetService = budgetService;
    this.categoryService = categoryService
  }

  configureRoutes(app: Application) : void{
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.index.bind(this));
    app.post(`${ROUTE}`, this.saveBudget.bind(this));
  }

  async index(req: Request, res: Response){
    const allBudgets = await this.budgetService.getAll();
    res.send(allBudgets);
  }

  async saveBudget(req: Request, res: Response){
    const categories = extractingCategoriesToBeSave(req.body)
    const categoriesIDs = await this.categoryService.save(categories);
    const filteredCategoryIDs = categoriesIDs.filter((id): id is ObjectId => id !== undefined);
    const newBudget = formToEntityBudget(req.body, filteredCategoryIDs)
    await this.budgetService.save(newBudget)
    res.redirect('http://localhost:5173/budgets')
  }
}
