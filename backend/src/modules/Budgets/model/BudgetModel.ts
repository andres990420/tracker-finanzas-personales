import { Document, Model, model, Schema } from "mongoose";
import type { ICategory } from "../entity/budgetEntity.ts";

export interface IBudget extends Document {
  user: string;
  name: string;
  currentAmount: Number;
  maxAmount: Number;
  categories: Array<ICategory>;
  createdAt?: Date;
  updatedAt?: Date;
}

class BudgetSchema extends Schema<IBudget> {
  constructor() {
    super(
      {
        user: { type: String },
        name: { 
          type: String, 
          required: true },
        currentAmount: { 
          type: Number,
          required: true
         },
        maxAmount: { 
          type: Number,
          required: true 
        },
        categories: { 
          type: [],
          required: true
        },
      },
      { timestamps: true }
    );
  }
}

const budgetSchema = new BudgetSchema();

const BudgetModel: Model<IBudget> = model<IBudget>("Budget", budgetSchema);

export default BudgetModel;
