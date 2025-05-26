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
      // validateUser,
      this.index.bind(this));
    app.post(`${ROUTE}/create`,
      // validateUser,
      this.saveBudget.bind(this));
  }

  async index(req: Request, res: Response){  
    const allBudgets = await this.budgetService.getAll();
    res.send(allBudgets);
  }

  async saveBudget(req: Request, res: Response){
    console.log(typeof req.user)
    try{
      await this.budgetService.save(req.body, req.user as ObjectId)
    } catch(err){
      res.status(400)
    }
    
    res.redirect('http://localhost:5173/budgets')
  }
}
