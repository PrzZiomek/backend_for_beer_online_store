import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator/check';

import { UserInterface } from "../../models/users/interfaces/user";
import { User } from "../../models/users/User";
import { errorHandle } from "../errors/errorHandle";
import { runInNewContext } from "vm";



export const validationMessage = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface = req.body; 
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return res.status(422).json({
        message: validationErrors.array(),
      });
    }else{
      req.app.locals.user = user; 
      next();
    }    
}


export const registration = async (req: Request, res: Response, next: NextFunction) => {
  const user: UserInterface = req.app.locals.user; 
  const hashedPswd = await bcrypt.hash(user.password, 12).catch(err => next(errorHandle(err, 500)));
  if(!hashedPswd) return;
  User.saveUser({
     ...user,
     password: hashedPswd
  });
  res.status(200).json({
    message: "Rejestracja się udała"
  });    
}


