import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator/check';


import { UserInterface } from "../../models/users/interfaces/user";
import { User } from "../../models/users/User";
import { errorHandle } from "../errors/errorHandle";



export const registration = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface = req.body; 
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return res.status(422).json({
        message: validationErrors.array(),
      });
    }else{
      const hashedPswd = await bcrypt.hash(user.password, 12).catch(err => next(errorHandle(err, 500)));
      if(!hashedPswd) return;
      let password = hashedPswd;
      User.saveUser({ ...user, password });
      res.status(200).json({
        message: "Rejestracja się udała"
      });    
    }      
}






