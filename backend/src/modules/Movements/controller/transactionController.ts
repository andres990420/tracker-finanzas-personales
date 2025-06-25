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
    app.get(
      `${this.TRANSACTION_ROUTE}/:id`,
      validateUser,
      this.getTransactionById.bind(this)
    );
    app.post(
      `${this.TRANSACTION_ROUTE}/:id`,
      validateUser,
      this.updateTransaction.bind(this)
    );
    app.post(
      `${this.TRANSACTION_ROUTE}/:id/delete`,
      validateUser,
      this.deleteTransaction.bind(this)
    );
  }

  public async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await this.transactionService.getAll(
        req.user as ObjectId
      );
      res.status(200).send(transactions);
    } catch (error) {
      console.error("Error en getAllTransactions:", error);
      res
        .status(400)
        .json({ error: "Ha ocurrido un erro al recuperar las transacciones" });
    }
  }

  public async getTransactionById(req: Request, res: Response) {
    try {
      const transaction = await this.transactionService.getTransactionById(
        req.params.id as unknown as ObjectId
      );
      res.status(200).send(transaction);
    } catch (error) {
      console.error("Error en getTransactionById:", error);
      res
        .status(400)
        .json({ error: "Ha ocurrido un erro al recuperar la transaction" });
    }
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
    } catch (error) {
      console.error("Error en saveTransaction: ", error);
      res
        .status(400)
        .json({ error: "Ha ocurrido un erro al guardar la transaccion" });
    }
  }

  public async updateTransaction(req: Request, res: Response) {
    try {
      const transactionToEdit = formToEntityTransaction(
        req.body,
        req.user as ObjectId
      );
      transactionToEdit.id = req.params.id as unknown as ObjectId;
      if (!transactionToEdit) {
        res.status(404).json({ error: "Transaccion no encontrada" });
      }

      await this.transactionService.updateTransaction(transactionToEdit);
      res
        .status(200)
        .json({ message: "Transaccion actualizada correctamente" });
    } catch (error) {
      console.error("Error en updateTransaction:", error);
      res.status(400).json({ error: "Error al actualizar la transaccion" });
    }
  }

  public async deleteTransaction(req: Request, res: Response) {
    try {
      if (req.body.categoryId) {
        await this.transactionService.deleteTransaction(
          req.params.id as unknown as ObjectId,
          req.body.categoryId
        );
        res.status(200).json({ error: "Transaccion eliminada con exito" });
      } else {
        await this.transactionService.deleteTransaction(
          req.params.id as unknown as ObjectId
        );
        res.status(200).json({ error: "Transaccion eliminada con exito" });
      }
    } catch (error) {
      console.error("Error en deleteTransaction:", error);
      res
        .status(400)
        .json({ error: "Ha ocurrido un error al eliminar la transaccion" });
    }
  }
}
