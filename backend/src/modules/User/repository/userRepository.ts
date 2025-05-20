import {Model} from "mongoose"
import {type IUserModel} from "../model/userModel.ts"
import User from "../entity/user.ts"

export default class UserRepository{
    private userModel: Model<IUserModel>
    
    constructor(userModel: Model<IUserModel>){
        this.userModel = userModel
    }

    public async getUserById(userData: User){
        const user = await this.userModel.findById(userData.id)
    }

    public async saveUser(userData: User){
        const userModel = new this.userModel({userData});
        await userModel.save()
    }
}