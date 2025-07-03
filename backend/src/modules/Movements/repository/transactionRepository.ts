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
      console.error("Error en getAll:", error);
      throw Error("Ha ocurrido un error al recuperar las transacciones");
    }
  }

  public async getTransactionById(transactionId: ObjectId) {
    try {
      const response = await this.transactionModel.findById(transactionId);
      const transaction = {
        user: response?.user,
        id: response?.id,
        description: response?.description,
        amount: response?.amount,
        type: response?.type,
        category: response?.category,
        date: response?.date
      };
      return modelToEntity(transaction as ITransaccionModel);
    } catch (error) {
      console.error("Error en getTransactionById:", error);
      throw new Error("Ha ocurrido un error al recuperar la transaccion");
    }
  }

  public async saveTransaction(transaction: Transaction, userId: ObjectId) {
    try {
      const newTransaction = new this.transactionModel({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
        user: userId,
      });
      newTransaction.save();
      return modelToEntity(newTransaction);
    } catch (error) {
      console.error("Error en saveTransaction:", error);
      throw new Error("Ha ocurrido un error al guardar la transaccion");
    }
  }

  public async updateTransaction(transaction: Transaction) {
    try {
      await this.transactionModel.findByIdAndUpdate(transaction.id, {
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date
      });
      return transaction;
    } catch (error) {
      console.error("Error en updateTransaction:", error);
      throw new Event("Ha ocurrido un error al actualizar la transaccion");
    }
  }

  public async deleteTransaction(transactionId: ObjectId) {
    try {
      await this.transactionModel.deleteOne({ _id: transactionId });
    } catch (error) {
      console.error("Error en deleteTransaction:", error);
      throw new Event("Ha ocurrido un error al eliminar la transaccion");
    }
  }
}
