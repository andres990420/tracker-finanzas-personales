import type { Application, Request, Response } from "express";
import BudgetService from "../service/BudgetService.ts";
import { ObjectId } from "mongoose";
import { validateUser } from "../../User/auth/userAuth.ts";


export default class BudgetsController {
  private readonly ROUTE_BASE: string = "/budgets";
  private budgetService: BudgetService;

  constructor(budgetService: BudgetService) {
    this.budgetService = budgetService;
  }

  configureRoutes(app: Application) : void{
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`,
      validateUser,
      this.index.bind(this));
    app.post(`${ROUTE}/create`,
      validateUser,
      this.saveBudget.bind(this));
  }

  async index(req: Request, res: Response){  
    const allBudgets = await this.budgetService.getAll(req.user as ObjectId);
    res.send(allBudgets);
  }

  async saveBudget(req: Request, res: Response){
    console.log(typeof req.user)
    try{
      await this.budgetService.save(req.body, req.user as ObjectId)
      res.status(204).json('Presupuesto creado con exito')
    } catch(err){
      res.status(400)
    }
  }
}
