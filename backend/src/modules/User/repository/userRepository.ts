import { Model } from "mongoose";
import { UserSchema, type IUserModel } from "../model/userModel.ts";
import User from "../entity/user.ts";

export default class UserRepository {
  private userModel: Model<IUserModel>;
  private userSchema: UserSchema;

  constructor(userModel: Model<IUserModel>, userSchema: UserSchema) {
    this.userModel = userModel;
    this.userSchema = userSchema;
  }

  public async getUserById(userData: User) {
    try {
      const user = await this.userModel.findById(userData.id);
      if (!user) {
        throw Error(`No se ha encontrado el usuario con id: ${userData.id}`);
      }
      return user;
    } catch (error) {
      console.error("Error en getUserById:", error);
      throw new Error("Error al buscar el usuario en la base de datos");
    }
  }

  public async registerNewUser(userData: User) {
    try {
      if (await this.userModel.findOne({ email: userData.email })) {
        return "Este correo ya esta registrado";
      } else {
        userData.password = await this.userSchema.methods.encryptPassword(
          userData.password
        );

        const userModel = new this.userModel({
          email: userData.email,
          password: userData.password,
        });
        await userModel.save();

        return "Usuario creado con exito";
      }
    } catch (error) {
      console.error("Error en registerNewUser:", error);
      throw new Error("Error al buscar el usuario en la base de datos");
    }
  }
}
