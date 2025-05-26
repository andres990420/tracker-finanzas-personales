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
    return await this.transactionRepository.getAll(userId);
  }

  public async getTransactionById(transactionId: ObjectId) {
    return await this.transactionRepository.getTransactionById(transactionId);
  }

  public async save(transaction: Transaction, userId: ObjectId) {
    return await this.transactionRepository.saveTransaction(
      transaction,
      userId
    );
  }

  public async saveTransactionIntoCategory(
    transaction: Transaction,
    categoryId: ObjectId,
    userId: ObjectId
  ) {
    const newTransaction = await this.transactionRepository.saveTransaction(
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
  }

  public async updateTransaction(transaction: Transaction) {
    const updatedTransaction =
      await this.transactionRepository.updateTransaction(transaction);
    const data = {
      transactionAmount: updatedTransaction.amount,
      transactionId: updatedTransaction.id,
      userId: transaction.user,
    };

    EventBus.emit(EventTypes.UPDATE_CATEGORY, data);
  }

  public async deleteTransaction(
    transactionId: ObjectId,
    categoryId?: ObjectId
  ) {
    try {
      const transaction = await this.transactionRepository.getTransactionById(
        transactionId
      );
      await this.transactionRepository.deleteTransaction(transactionId);
      if (categoryId) {
        EventBus.emit(EventTypes.DELETE_TRANSACTION_FROM_CATEGORY, {
          transactionId: transactionId,
          amount: transaction.amount,
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
