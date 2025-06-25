import { ObjectId } from "mongoose";
import Transaction from "../entity/transactionEntity.ts";
import type { ITransaccionModel } from "../model/transactionModel.ts";

export interface dataFormTransaction {
  type: string;
  category: string;
  amount: number;
  description: string;
}

export function formToEntityTransaction(
  data: dataFormTransaction,
  userId: ObjectId
): Transaction {
  const newTransaction = new Transaction(
    data.type,
    data.amount,
    data.category,
    userId,
    data.description,
  );
  return newTransaction;
}

export function modelToEntity(data: ITransaccionModel) {
  return new Transaction(
    data.type,
    data.amount,
    data.category,
    data.user,
    data.description,
    data.id,
    
  );
}
