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

  configureRoutes(app: Application): void {
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, validateUser, this.index.bind(this));
    app.post(`${ROUTE}/create`, validateUser, this.saveBudget.bind(this));
    app.post(`${ROUTE}/:id/delete`, validateUser, this.deleteBudget.bind(this));
  }

  async index(req: Request, res: Response) {
    try {
      const allBudgets = await this.budgetService.getAll(req.user as ObjectId);
      res.send(allBudgets);
    } catch (error) {
      res.status(400).json({message: 'Ha ocurrido un error al recuperar los presupuestos'})
      console.error(error)
    }
  }

  async saveBudget(req: Request, res: Response) {
    try {
      await this.budgetService.save(req.body, req.user as ObjectId);
      res.status(204).json("Presupuesto creado con exito");
    } catch (error) {
      res.status(400).json({message: 'Ha ocurrido un error al crear el nuevo presupuesto'});
      console.error(error)
    }
  }

  async deleteBudget(req: Request, res: Response){
    try{
      await this.budgetService.deleteBudget(req.params.id)
      res.status(204).json("Presupuesto eliminado con exito");
    } catch (error){
      res.status(400).json({message: 'Ha ocurrido un error al eliminar el presupuesto'});
      console.error(error)
    }
  }
}
