import { Model } from "mongoose";
import { type ITransaccionModel } from "../model/transactionModel.ts";
import Transaction, { type ITransaction } from "../entity/transactionEntity.ts";
import { modelToEntity } from "../utils/transactionMapper.ts";

export default class TransactionRepository {
  private transactionModel: Model<ITransaccionModel>;

  constructor(movementModel: Model<ITransaccionModel>) {
    this.transactionModel = movementModel;
  }

  public async getAll() {
    const allTransactions = await this.transactionModel.find();
    return allTransactions.map(transaction=>modelToEntity(transaction));
  }

  public async saveTransaction(transaction: Transaction) {
    const newTransaction = new this.transactionModel({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
    });
    // newTransaction.save();
    return modelToEntity(newTransaction)
  }
}
