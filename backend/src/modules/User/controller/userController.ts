import type { Application, Request, Response } from "express";
import UserService from "../service/userService.ts";
import { formToEntityUser } from "../utils/userMapper.ts";
import passport from "passport";

export default class UserController {
  private userService: UserService;
  private BASE_ROUTE: string = "/user";

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public configureRoutes(app: Application) {
    app.post(`${this.BASE_ROUTE}/signup`, this.signUp.bind(this));
    app.post(`${this.BASE_ROUTE}/signin`, this.signIn.bind(this));
    app.get(`${this.BASE_ROUTE}/logout`, this.logout.bind(this));
  }

  private async signUp(req: Request, res: Response) {
    console.log(req.body);
    const user = formToEntityUser(req.body);
    const repuesta = await this.userService.saveUser(user);
    res.send(repuesta);
  }

  private async signIn(req: Request, res: Response, next: Function) {
    passport.authenticate(
      "local",
      async (err: unknown, user: any, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          // Si la autenticación falla, responde con error
          return res
            .status(401)
            .json({ message: info?.message ||  "Credenciales inválidas" });
        }
        req.logIn(user, (err: unknown) => {
          if (err) {
            return next(err);
          }
          // Si la autenticación es exitosa, responde con el usuario o un mensaje de éxito
          return res
            .status(200)
            .json({ message: "Inicio de sesión exitoso", user });
        });
      }
    )(req, res, next);
  }

  private logout(req: Request, res: Response) {
    req.logout(done=>{
        return res.json({message: "Sesion finalizada"})
    });
  }
}
