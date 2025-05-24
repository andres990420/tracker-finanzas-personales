import { ObjectId } from "mongoose";

export interface ITransaction {
  type: string;
  amount: number;
  category: string;
  description: string;
  // user?: string;
  id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Transaction {
  public type: string;
  public amount: number;
  public category: string;
  public description: string;
  // public user?: string;
  public id?: ObjectId;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    type: string,
    amount: number,
    category: string,
    description: string,
    // user?: string,
    id?: ObjectId,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.type = type;
    this.amount = amount;
    this.category = category;
    this.description = description;
    // this.user = user;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
