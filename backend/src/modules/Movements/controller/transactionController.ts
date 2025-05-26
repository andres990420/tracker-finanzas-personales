import type { Application, Request, Response } from "express";
import TransactionService from "../service/transactionService.ts";
import { formToEntityTransaction } from "../utils/transactionMapper.ts";
import { validateUser } from "../../User/auth/userAuth.ts";
import { ObjectId } from "mongoose";

export default class TransactionController {
  private transactionService: TransactionService;
  private readonly TRANSACTION_ROUTE = "/transactions";

  constructor(movementService: TransactionService) {
    this.transactionService = movementService;
  }

  public configureRoutes(app: Application) {
    app.get(`${this.TRANSACTION_ROUTE}`,validateUser ,this.getAllTransactions.bind(this));
    app.post( `${this.TRANSACTION_ROUTE}/create`,validateUser ,this.saveTransaction.bind(this)
    );
  }

  public async getAllTransactions(req: Request, res: Response) {
    const movements = await this.transactionService.getAll();
    res.send(movements);
  }

  public async saveTransaction(req: Request, res: Response) {
    if (req.body.categoryId) {
      const newTransaction = formToEntityTransaction(req.body, req.user as ObjectId);
      await this.transactionService.saveTransactionIntoCategory(
        newTransaction,
        req.body.categoryId,
        req.user as ObjectId
      );
    } else {
      const newTransaction = formToEntityTransaction(req.body, req.user as ObjectId);
      await this.transactionService.save(newTransaction, req.user as ObjectId);
    }
    res.status(200)
  }
}
