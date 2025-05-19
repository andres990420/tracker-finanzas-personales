import { Document, Model, model, Schema } from "mongoose";
import type { ICategory } from "../entity/categoryEntity.ts";
import Category from "../entity/categoryEntity.ts";


export interface IBudgetModel extends Document {
  user: string;
  name: string;
  currentAmount: Number;
  maxAmount: Number;
  categories: Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBudgetModelPopulated extends Document {
  user: string;
  name: string;
  currentAmount: Number;
  maxAmount: Number;
  categories: Category[];
  createdAt?: Date;
  updatedAt?: Date;
}

class BudgetSchema extends Schema<IBudgetModel> {
  constructor() {
    super(
      {
        user: { type: String },
        name: {
          type: String,
          required: true,
        },
        currentAmount: {
          type: Number,
          required: true,
        },
        maxAmount: {
          type: Number,
          required: true,
        },
        categories: [{
          type: Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        }],
      },
      { timestamps: true }
    );
  }
}

const budgetSchema = new BudgetSchema();

const BudgetModel: Model<IBudgetModel> = model<IBudgetModel>(
  "Budget",
  budgetSchema
);

export default BudgetModel;
