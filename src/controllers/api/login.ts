import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

import { UserInterface } from "../../models/users/interfaces/user";
import { bcryptCompare } from "./helpers/bcryptCompare";
import { User } from '../../models/users/User';
import { errorHandle } from "../errors/errorHandle";
import { token } from '../../models/token/token';



export const login = async (req: Request, res: Response, next: NextFunction) => {
  const user: UserInterface = req.body;  
  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    return res.status(422).json({
      message: validationErrors.array(),
    });
  }else{
    res.status(200).json({
      message: "Jesteś zalogowany",
      token,
    })   
  }                       
}


/*
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface = req.body.user;  
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return res.status(422).json({
        message: validationErrors.array(),
      });
    }
    const matchedUser = await User.findUser(user).catch(err => next(errorHandle(err, 500)));    
    if(matchedUser){ 
      const doMatch = await bcryptCompare(user.password, matchedUser.password).catch(err => next(errorHandle(err, 500)));
      if(doMatch === undefined) return; 
      res.status(200).json({
        message: doMatch ? "Jesteś zalogowany!" : "Nieprawidłowe hasło lub login!",
        userId: matchedUser.id,
        token,
      })   
    }else{ 
      res.status(200).json({
        message: "Nieprawidłowe hasło lub login!",
      })  
     }                               
}

*/
