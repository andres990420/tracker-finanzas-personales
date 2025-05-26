import passport from "passport";
import type { Request, Response } from "express";


export function validateUser(req: Request, res: Response, next: Function) {
  if(req.isAuthenticated()){
    return next()
  }
  res.status(401).json({error: "Necesitas estar autentificado"})
  }