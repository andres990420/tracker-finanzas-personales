import { Model } from "mongoose";
import MovementModel, {type IMovementModel} from "../model/movementModel.ts";

export default class MovementRepository{
    private movementModel : Model<IMovementModel>
    
    constructor(
        movementModel: Model<IMovementModel>
    ){
        this.movementModel = movementModel
    }
}