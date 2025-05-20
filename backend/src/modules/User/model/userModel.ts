import mongoose, { Schema, Document, Model, model } from "mongoose";

export interface IUserModel extends Document {
  email: string;
  password: string;
}

class UserSchema extends Schema {
  constructor() {
    super(
      {
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        profilePhoto: { type: String },
      },
      { timestamps: true }
    );
  }
}

const userSchema = new UserSchema();

const UserModel: Model<IUserModel> = model<IUserModel>("User", userSchema);

export default UserModel;
