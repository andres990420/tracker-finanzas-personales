import { Document, Model, model, Schema } from "mongoose";

export interface IBudget extends Document {
  user: String ;
  name: String ;
  currentAmount: Number ;
  limitAmount: Number ;
  categories: [] ;
}



class BudgetSchema extends Schema<IBudget> {
  constructor() {
    super(
      {
        user: { type: String },
        name: { type: String },
        currentAmount: { type: Number },
        limitAmount: { type: Number },
        categories: { type: [] },
      },
      { timestamps: true }
    );
  }
}

const budgetSchema = new BudgetSchema();

const BudgetModel: Model<IBudget> = model<IBudget>("Budget", budgetSchema);


export default BudgetModel
