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
    app.get(
      `${this.TRANSACTION_ROUTE}`,
      validateUser,
      this.getAllTransactions.bind(this)
    );
    app.post(
      `${this.TRANSACTION_ROUTE}/create`,
      validateUser,
      this.saveTransaction.bind(this)
    );
    app.get(`${this.TRANSACTION_ROUTE}/:id`, validateUser, this.getTransactionById.bind(this))
    app.post(`${this.TRANSACTION_ROUTE}/:id`, validateUser, this.updateTransaction.bind(this))
    app.post(`${this.TRANSACTION_ROUTE}/:id/delete`, validateUser, this.deleteTransaction.bind(this))
  }

  public async getAllTransactions(req: Request, res: Response) {
    const transactions = await this.transactionService.getAll(
      req.user as ObjectId
    );
    res.send(transactions);
  }

  public async getTransactionById(req: Request, res: Response){
    const transaction = await this.transactionService.getTransactionById(req.params.id as unknown as ObjectId)
    res.send(transaction)
  }

  public async saveTransaction(req: Request, res: Response) {
    try {
      if (req.body.categoryId) {
        const newTransaction = formToEntityTransaction(
          req.body,
          req.user as ObjectId
        );
        await this.transactionService.saveTransactionIntoCategory(
          newTransaction,
          req.body.categoryId,
          req.user as ObjectId
        );
      } else {
        const newTransaction = formToEntityTransaction(
          req.body,
          req.user as ObjectId
        );
        await this.transactionService.save(
          newTransaction,
          req.user as ObjectId
        );
      }
      res.status(204).json({ message: "Transaction guardada con exito" });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  public async updateTransaction(req: Request, res: Response){
    const transactionToEdit = formToEntityTransaction(req.body, req.user as ObjectId);
    transactionToEdit.id = req.params.id as unknown as ObjectId
    if(!transactionToEdit){
      res.status(404).json({message: 'Transaccion no encontrada'})
    }
    await this.transactionService.updateTransaction(transactionToEdit)
    res.status(200)
  }

  public async deleteTransaction(req: Request, res: Response){
    if(req.body.categoryId){
      await this.transactionService.deleteTransaction(req.params.id as unknown as ObjectId, req.body.categoryId)
      res.status(200)
    }
    await this.transactionService.deleteTransaction(req.params.id as unknown as ObjectId)
    res.status(200)
  }
}
