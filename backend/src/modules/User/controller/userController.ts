import { request, response, type Application, type Request, type Response } from "express";
import UserService from "../service/userService.ts";
import { formToEntityUser } from "../utils/userMapper.ts";
import { validateUser } from "../auth/userAuth.ts";
import { userSchema } from "../auth/registerValidation.ts";


export default class UserController {
  private userService: UserService;
  private BASE_ROUTE: string = "/user";

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public configureRoutes(app: Application) {
    app.post(`${this.BASE_ROUTE}/signup`,  this.signUp.bind(this));
    app.post(`${this.BASE_ROUTE}/signin`, validateUser, this.signIn.bind(this));
    app.get(`${this.BASE_ROUTE}/logout`, this.logout.bind(this));
  }

  private async signUp(req: Request, res: Response) {
    console.log(req.body);
    const parseResult = userSchema.safeParse(req.body)
    if(!parseResult) res.status(400).json({ error: "Datos invalidos" })
    const user = formToEntityUser(req.body);
    const repuesta = await this.userService.saveUser(user);
    res.send(repuesta);
  }

  private async signIn(req: Request, res: Response){
    res.status(200)
  }

  private logout(req: Request, res: Response) {
    req.logout(done=>{
        return res.json({message: "Sesion finalizada"})
    });
  }
}
