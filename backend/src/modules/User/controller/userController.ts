import type {  Application, Request, Response } from "express";
import UserService from "../service/userService.ts";

export default class UserController{
    private userService: UserService
    private BASE_ROUTE: string = "/user"

    constructor(userService: UserService){
        this.userService = userService
    }

    public configureRoutes(app: Application){
        app.get(`${this.BASE_ROUTE}`, this.index.bind(this))
    }

    private index(req : Request, res: Response){
        res.send("Hola Mundo")
    }
}