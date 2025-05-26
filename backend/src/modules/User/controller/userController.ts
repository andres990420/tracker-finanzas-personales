import type { NextFunction, Application, Request, Response } from "express";
import UserService from "../service/userService.ts";
import { formToEntityUser } from "../utils/userMapper.ts";
import { validateUser } from "../auth/userAuth.ts";
import { userSchema } from "../auth/registerValidation.ts";
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
    const parseResult = userSchema.safeParse(req.body);
    if (!parseResult) res.status(400).json({ error: "Datos invalidos" });
    const user = formToEntityUser(req.body);
    const repuesta = await this.userService.saveUser(user);
    res.send(repuesta);
  }

  private signIn(req: Request, res: Response) {
    passport.authenticate("local",(error : Error, user: any, info : any) => {
      if(error){
        return res.status(500).json({error})
      }
      if (!user) {
          // Si la autenticación falla, responde con error
          return res
            .status(401)
            .json({ message: info?.message ||  "Credenciales inválidas" });
        }
        req.login(user, (err: unknown) => {
          if (err) {
            return res.status(500).json({err})
          }
          // Si la autenticación es exitosa, responde con el usuario o un mensaje de éxito
          return res
            .status(200)
            .redirect('http://localhost:5173/')
            // .json({ message: "Inicio de sesión exitoso" , userId: user.id});
        });
    })(req, res);
  }

  private logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) return res.status(500).json({error: 'Error al logout'});
      return res.status(204).json({ message: "Sesion finalizada" });
    });
  }
}
