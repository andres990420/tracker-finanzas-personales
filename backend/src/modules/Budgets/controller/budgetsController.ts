import type { Application, Request, Response } from "express";
import BudgetsService from "../service/BudgetsService.ts";
import BudgetModel from "../model/BudgetsModel.ts";

export default class BudgetsController {
  private ROUTE_BASE: string = "/budgets";
  private budgetService: BudgetsService;

  constructor(budgetService: BudgetsService) {
    this.budgetService = budgetService;
  }

  configureRoutes(app: Application) {
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.index.bind(this));
  }

  async index(req: Request, res: Response) {
    const allBudgets = await this.budgetService.getAll();
    res.send(allBudgets);
  }
}
