import { Application } from "express";
import MovementService from "../service/movementService.ts";

export default class MovementController{
    private movementService : MovementService
    private readonly MOVEMENT_ROUTE = '/movements'


    constructor(
        movementService: MovementService
    ){
        this.movementService = movementService
    }

    public configureRoutes(app: Application){
        app.get(`${this.MOVEMENT_ROUTE}`, /* TODO INDEX */);
    }
}
