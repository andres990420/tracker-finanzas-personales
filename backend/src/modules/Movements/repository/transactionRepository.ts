import { Model, ObjectId } from "mongoose";
import { type ITransaccionModel } from "../model/transactionModel.ts";
import Transaction, { type ITransaction } from "../entity/transactionEntity.ts";
import { modelToEntity } from "../utils/transactionMapper.ts";

export default class TransactionRepository {
  private transactionModel: Model<ITransaccionModel>;

  constructor(movementModel: Model<ITransaccionModel>) {
    this.transactionModel = movementModel;
  }

  public async getAll(userId: ObjectId) {
    try {
      const allTransactions = await this.transactionModel.find({
        user: userId,
      });
      return allTransactions.map((transaction) => modelToEntity(transaction));
    } catch (error) {
      throw error;
    }
  }

  public async getTransactionById(transactionId: ObjectId) {
    try {
      const transaction = (await this.transactionModel.findById(
        transactionId
      )) as ITransaccionModel;
      return modelToEntity(transaction);
    } catch (error) {
      throw error;
    }
  }

  public async saveTransaction(transaction: Transaction, userId: ObjectId) {
    try {
      const newTransaction = new this.transactionModel({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description,
        user: userId,
      });
      newTransaction.save();
      return modelToEntity(newTransaction);
    } catch (error) {
      throw error;
    }
  }

  public async updateTransaction(transaction: Transaction) {
    try {
      await this.transactionModel.findByIdAndUpdate(transaction.id, {
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.category,
      });
      return transaction;
    } catch (error) {
      throw error;
    }
  }

  public async deleteTransaction(transactionId: ObjectId) {
    try {
      await this.transactionModel.deleteOne({ _id: transactionId });
    } catch (error) {
      throw error;
    }
  }
}
