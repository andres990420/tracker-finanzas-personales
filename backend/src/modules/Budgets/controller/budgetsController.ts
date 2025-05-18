import type { Application, Request, Response } from "express";
import BudgetsService from "../service/BudgetsService.ts";

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

  index(req: Request, res: Response) {
    const x = this.budgetService.getAll();
    res.send(x);
  }
}
