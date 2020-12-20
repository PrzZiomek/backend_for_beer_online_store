import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { UserInterface } from "../../models/users/interfaces/user";
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

