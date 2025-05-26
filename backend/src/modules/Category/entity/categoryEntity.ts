import { ObjectId } from "mongoose";


export interface ICategory {
  id?: ObjectId;
  user: ObjectId
  type: string;
  maxAmount: Number;
  currentAmount: Number;
  color: string;
  description: string;
  transactions?: ObjectId[];
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export default class Category {
  public id?: ObjectId;
  public user: ObjectId;
  public type: string;
  public maxAmount: Number;
  public currentAmount: Number;
  public color: string;
  public description: string;
  public transactions: ObjectId[] | undefined;
  public createdAt?: Date | undefined;
  public updatedAt?: Date | undefined;

  constructor(
    type: string,
    maxAmount: Number,
    currenteAmount: Number,
    color: string,
    description: string,
    user: ObjectId,
    id?: ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    transactions?: ObjectId[] | undefined,
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
