import type { Application, Request, Response } from "express";
import BudgetService from "../service/BudgetService.ts";

export default class BudgetsController {
  private ROUTE_BASE: string = "/budgets";
  private budgetService: BudgetService;

  constructor(budgetService: BudgetService) {
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
