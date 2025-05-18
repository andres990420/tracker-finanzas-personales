import type { Application, Request, Response } from "express";
import BudgetService from "../service/BudgetService.ts";
import { formToEntity } from "../utils/budgetMapper.ts";
import data from "../utils/budget.json" with { type: "json"}

export default class BudgetsController {
  private ROUTE_BASE: string = "/budgets";
  private budgetService: BudgetService;

  constructor(budgetService: BudgetService) {
    this.budgetService = budgetService;
  }

  configureRoutes(app: Application) : void{
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.index.bind(this));
    app.post(`${ROUTE}`, this.saveBudget.bind(this));
  }

  async index(req: Request, res: Response){
    const allBudgets = await this.budgetService.getAll();
    allBudgets.map(budget=>console.log(budget.categories))
    res.send(allBudgets);
  }

  async saveBudget(req: Request, res: Response){
    const newBudget = formToEntity(req.body)
    // await this.budgetService.save(newBudget)
    res.send(newBudget)
  }
}
