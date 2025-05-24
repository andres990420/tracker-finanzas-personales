import { Schema, Document, model, Model } from "mongoose";
import type { ITransaccionModel } from "../../Movements/model/transactionModel.ts";

export interface ICategoryModel extends Document {
  user: string;
  type: string;
  currentAmount: number;
  maxAmount: number;
  color: string;
  description: string;
  transactions: ITransaccionModel[];
  createdAt: Date;
  updatedAt: Date;
}

class CategorySchema extends Schema {
  constructor() {
    super(
      {
        user: { type: String },
        type: {
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
        color: {
          type: String,
        },
        description: {
          type: String,
        },
        transactions: [
          {
            type: Schema.Types.ObjectId,
            ref: "Transaction",
          },
        ],
      },
      { timestamps: true }
    );
  }
}

const categorySchema = new CategorySchema();

const CategoryModel: Model<ICategoryModel> = model<ICategoryModel>(
  "Category",
  categorySchema
);

export default CategoryModel;
