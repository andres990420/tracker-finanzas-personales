import EventBus from "../../../common/eventBus.ts";
import { EventTypes } from "../../../common/eventTypes.ts";
import Transaction from "../entity/transactionEntity.ts";
import TransactionRepository from "../repository/transactionRepository.ts";
import { ObjectId } from "mongoose";

export default class TransactionService {
  private transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async getAll(userId: ObjectId) {
    try {
      return await this.transactionRepository.getAll(userId);
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error("Ha ocurrido un error al recuperar las transacciones");
    }
  }

  public async getTransactionById(transactionId: ObjectId) {
    try {
      return await this.transactionRepository.getTransactionById(transactionId);
    } catch (error) {
      console.error("Error en getTransactionById:", error);
      throw new Error("Ha ocurrido un error al recuperar la transaccion");
    }
  }

  public async save(transaction: Transaction, userId: ObjectId) {
    try {
      return await this.transactionRepository.saveTransaction(
        transaction,
        userId
      );
    } catch (error) {
      console.error("Error en save:", error);
      throw new Error("Ha ocurrido un error al guardar la transaccion");
    }
  }

  public async saveTransactionIntoCategory(
    transaction: Transaction,
    categoryId: ObjectId,
    userId: ObjectId
  ) {
    let newTransaction;
    try {
      newTransaction = await this.transactionRepository.saveTransaction(
        transaction,
        userId
      );
      const data = {
        categoryId: categoryId,
        userId: userId,
        amount: newTransaction.amount,
        transactionId: newTransaction.id,
      };
      EventBus.emit(EventTypes.ADD_TRANSACTION_INTO_CATEGORY, data);
    } catch (error) {
      console.error("Error en saveTransactionIntoCategory:", error);
      throw new Error("Ha ocurrido un error al guardar la transaccion");
    }
  }

  public async updateTransaction(transaction: Transaction, categoryId?: ObjectId) {
    try {
      const updatedTransaction =
        await this.transactionRepository.updateTransaction(transaction);
      const data = {
        transactionAmount: updatedTransaction.amount,
        transactionId: updatedTransaction.id,
        userId: transaction.user,
        categoryId : categoryId
      };

      EventBus.emit(EventTypes.UPDATE_CATEGORY, data);
    } catch (error) {
      console.error("Error en updateTransaction:", error);
      throw new Error("Ha ocurrido un error a actulizar la transaccion");
    }
  }

  public async deleteTransaction(
    transactionId: ObjectId,
    categoryId?: ObjectId
  ) {
    try {
      const transaction = await this.transactionRepository.getTransactionById(
        transactionId
      );
      if (!transaction) {
        throw new Error("No se ha econtrado la transaccion");
      }
      await this.transactionRepository.deleteTransaction(transactionId);
      if (categoryId) {
        EventBus.emit(EventTypes.DELETE_TRANSACTION_FROM_CATEGORY, {
          transactionId: transactionId,
          amount: transaction.amount,
        });
      }
    } catch (error) {
      console.error("Error en deleteTransaction:", error);
      throw new Error("Ha ocurrido un error al eliminar una transaccion");
    }
  }
}
