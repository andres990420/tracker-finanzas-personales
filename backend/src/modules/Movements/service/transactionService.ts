import { Schema } from "zod";
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

  public async getAll() {
    return await this.transactionRepository.getAll();
  }

  public async save(transaction: Transaction) {
    return await this.transactionRepository.saveTransaction(transaction);
  }

  public async saveTransactionIntoCategory(
    transaction: Transaction,
    categoryId: ObjectId
  ) {
    const newTransaction = await this.transactionRepository.saveTransaction(
      transaction
    );
    const data = {
      categoryId: categoryId,
      amount: newTransaction.amount,
      transactionId: newTransaction.id,
    };
    EventBus.emit(EventTypes.ADD_TRANSACTION_INTO_CATEGORY, data);
  }
}
