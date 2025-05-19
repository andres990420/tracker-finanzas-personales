import { ObjectId } from "mongoose";

export interface ICategory {
  id?: ObjectId;
  user?: string | undefined
  type: string;
  maxAmount: Number;
  currentAmount: Number;
  color: string;
  description: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export default class Category {
  public id?: ObjectId;
  public user?: string | undefined
  public type: string;
  public maxAmount: Number;
  public currentAmount: Number;
  public color: string;
  public description: string;
  public createdAt?: Date | undefined;
  public updatedAt?: Date | undefined;

  constructor(
    type: string,
    maxAmount: Number,
    currenteAmount: Number,
    color: string,
    description: string,
    id?: ObjectId,
    createdAt?: Date,
    updatedAt?: Date,
    user?: string
  ) {
    this.type = type;
    this.maxAmount = maxAmount;
    this.currentAmount = currenteAmount;
    this.color = color;
    this.description = description;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user
  }
}
