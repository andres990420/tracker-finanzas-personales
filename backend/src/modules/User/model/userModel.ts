import mongoose, { Schema, Document, Model, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserModel extends Document {
  email: string;
  password: string;
}

export class UserSchema extends Schema {
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



export const userSchema = new UserSchema();

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async (password : string, passwordInDB: string) : Promise<boolean> =>{
  const isMatch = await bcrypt.compare(password, passwordInDB)
  return isMatch
}

const UserModel: Model<IUserModel> = model<IUserModel>("User", userSchema);

export default UserModel;
