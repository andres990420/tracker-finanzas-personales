import type { Application, Request, Response } from "express";
import BudgetService from "../service/BudgetService.ts";
import data from "../utils/budget.json" with { type: "json"}
import { ObjectId } from "mongoose";


export default class BudgetsController {
  private readonly ROUTE_BASE: string = "/budgets";
  private budgetService: BudgetService;

  constructor(budgetService: BudgetService) {
    this.budgetService = budgetService;
  }

  configureRoutes(app: Application) : void{
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.index.bind(this));
    app.post(`${ROUTE}/create`, this.saveBudget.bind(this));
  }

  async index(req: Request, res: Response){
    const allBudgets = await this.budgetService.getAll();
    res.send(allBudgets);
  }

  async saveBudget(req: Request, res: Response){
    await this.budgetService.save(req.body)
    res.redirect('http://localhost:5173/budgets')
  }
}
