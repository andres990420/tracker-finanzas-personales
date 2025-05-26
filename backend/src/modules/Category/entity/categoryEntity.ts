import { ObjectId } from "mongoose";
import type { ITransaccionModel } from "../../Movements/model/transactionModel.ts";


export interface ICategory {
  id?: ObjectId;
  user: ObjectId
  type: string;
  maxAmount: number;
  currentAmount: number;
  color: string;
  description: string;
  transactions?: ObjectId[] | ITransaccionModel[];
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export default class Category {
  public id?: ObjectId;
  public user: ObjectId;
  public type: string;
  public maxAmount: number;
  public currentAmount: number;
  public color: string;
  public description: string;
  public transactions: ObjectId[] | undefined | ITransaccionModel[];
  public createdAt?: Date | undefined;
  public updatedAt?: Date | undefined;

  constructor(
    type: string,
    maxAmount: number,
    currenteAmount: number,
    color: string,
    description: string,
    user: ObjectId,
    id?: ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    transactions?: ObjectId[] | undefined | ITransaccionModel[],
  ) {
    this.type = type;
    this.maxAmount = maxAmount;
    this.currentAmount = currenteAmount;
    this.color = color;
    this.description = description;
    this.id = id;
    this.transactions = transactions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }
}
