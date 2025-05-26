import { ObjectId } from "mongoose";
import Category from "../../Category/entity/categoryEntity.ts";

export default class Budget {
  public id: ObjectId | undefined;
  public user: ObjectId;
  public name: string;
  public currentAmount: Number;
  public maxAmount: Number;
  public categories?: Array<ObjectId> | Array<Category>;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  constructor(
    name: string,
    currentAmount: Number,
    maxAmount: Number,
    user: ObjectId,
    categories?: Array<ObjectId> | Array<Category>,
    createAt?: Date,
    updatedAt?: Date,
    id?: ObjectId
    
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
