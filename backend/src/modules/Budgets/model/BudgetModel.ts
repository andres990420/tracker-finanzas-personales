import { Document, Model, model, ObjectId, Schema } from "mongoose";
import type { ICategory } from "../../Category/entity/categoryEntity.ts";
import Category from "../../Category/entity/categoryEntity.ts";

export interface IBudgetModel extends Document {
  user: ObjectId;
  name: string;
  currentAmount: number;
  maxAmount: number;
  categories: Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBudgetModelPopulated extends Document {
  user: ObjectId;
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
        user: { type: Schema.Types.ObjectId, require: true, ref: "User"},
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
        categories: [
          {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
          },
        ],
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
