import passport from "passport";
import type { Request, Response } from "express";

export function validateUser(req: Request, res: Response, next: Function) {
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
          return next()
        });
      }
    )(req, res, next);
  }