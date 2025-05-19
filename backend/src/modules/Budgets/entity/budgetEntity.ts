import { ObjectId } from "mongoose";

export default class Budget {
  public id: string | undefined;
  public user: string | undefined;
  public name: string;
  public currentAmount: Number;
  public maxAmount: Number;
  public categories: Array<ObjectId> | undefined[];
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  constructor(
    name: string,
    currentAmount: Number,
    maxAmount: Number,
    categories: Array<ObjectId> | undefined[],
    createAt?: Date,
    updatedAt?: Date,
    id?: string,
    user?: string
  ) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.currentAmount = currentAmount;
    this.maxAmount = maxAmount;
    this.categories = categories;
    this.createdAt = createAt;
    this.updatedAt = updatedAt;
  }
}
