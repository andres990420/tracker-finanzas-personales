import { Schema, Document, Model, ObjectId, model } from "mongoose";

export interface IMovementModel extends Document {
  user: ObjectId;
  type: string;
  category: string;
  amount: number;
  description: number;
}

class MovementSchema extends Schema {
  constructor() {
    super(
      {
        user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
        type: { type: String, require: true },
        category: { type: String, require: true },
        amount: { type: Number, require: true },
        description: { type: String },
      },
      { timestamps: true }
    );
  }
}

const movementSchema = new MovementSchema();

const MovementModel : Model<IMovementModel> = model<IMovementModel>("Movement", movementSchema);

export default MovementModel;