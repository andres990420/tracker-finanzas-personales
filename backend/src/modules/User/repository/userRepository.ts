import { Model } from "mongoose";
import { UserSchema, type IUserModel } from "../model/userModel.ts";
import User from "../entity/user.ts";

export default class UserRepository {
  private userModel: Model<IUserModel>;
  private userSchema: UserSchema

  constructor(userModel: Model<IUserModel>, userSchema: UserSchema) {
    this.userModel = userModel;
    this.userSchema = userSchema;
  }

  public async getUserById(userData: User) {
    const user = await this.userModel.findById(userData.id);
    return user
  }

  public async registerNewUser(userData: User) {
    if (await this.userModel.findOne({ email: userData.email })) {
      return "Este correo ya esta registrado";
    } else {
        userData.password = await this.userSchema.methods.encryptPassword(userData.password);
        
        const userModel = new this.userModel({
        email: userData.email,
        password: userData.password,
      });
      await userModel.save();
      
      return "Usuario creado con exito";
    }
  }
}
