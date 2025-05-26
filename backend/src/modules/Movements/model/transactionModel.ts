import { Schema, Document, Model, ObjectId, model } from "mongoose";


export interface ITransaccionModel extends Document {
  user: ObjectId;
  type: string;
  amount: number;
  category: string;
  description: string;
}

class TransaccionSchema extends Schema {
  constructor() {
    super(
      {
        user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
        type: { type: String, require: true },
        amount: { type: Number, require: true },
        category: { type: String, require: true },
        description: { type: String, optional : true },
      },
      { timestamps: true }
    );
  }
}

const movementSchema = new TransaccionSchema();

const TransaccionModel: Model<ITransaccionModel> = model<ITransaccionModel>(
  "Transaction",
  movementSchema
);

export default TransaccionModel;
