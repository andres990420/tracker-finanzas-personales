import type { Application, Request, Response } from "express";
import TransactionService from "../service/transactionService.ts";
import { formToEntityTransaction } from "../utils/transactionMapper.ts";

export default class TransactionController {
  private transactionService: TransactionService;
  private readonly TRANSACTION_ROUTE = "/transactions";

  constructor(movementService: TransactionService) {
    this.transactionService = movementService;
  }

  public configureRoutes(app: Application) {
    app.get(`${this.TRANSACTION_ROUTE}`, this.getAllTransactions.bind(this));
    app.post(
      `${this.TRANSACTION_ROUTE}/create`,
      this.saveTransaction.bind(this)
    );
  }

  public async getAllTransactions(req: Request, res: Response) {
    const movements = await this.transactionService.getAll();
    res.send(movements);
  }

  public async saveTransaction(req: Request, res: Response) {
    res.json({ message: "transaccion completada" });
    if (req.body.categoryId) {
      const newTransaction = formToEntityTransaction(req.body);
      await this.transactionService.saveTransactionIntoCategory(
        newTransaction,
        req.body.categoryId
      );
    } else {
      const newTransaction = formToEntityTransaction(req.body);
      await this.transactionService.save(newTransaction);
    }
  }
}
