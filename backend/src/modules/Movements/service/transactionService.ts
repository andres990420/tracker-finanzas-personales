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

  public async save(transaction: Transaction, userId: ObjectId) {
    return await this.transactionRepository.saveTransaction(transaction, userId);
  }

  public async saveTransactionIntoCategory(
    transaction: Transaction,
    categoryId: ObjectId,
    userId: ObjectId
  ) {
    const newTransaction = await this.transactionRepository.saveTransaction(
      transaction, userId
    );
    const data = {
      categoryId: categoryId,
      userId: userId,
      amount: newTransaction.amount,
      transactionId: newTransaction.id,
    };
    EventBus.emit(EventTypes.ADD_TRANSACTION_INTO_CATEGORY, data);
  }
}
