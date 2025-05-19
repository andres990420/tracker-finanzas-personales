import { Schema, Document, model, Model } from "mongoose";

export interface ICategoryModel extends Document {
  user: string;
  type: string;
  currentAMount: number;
  maxAmount: number;
  description: string;
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
        description: {
          type: String,
        },
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
