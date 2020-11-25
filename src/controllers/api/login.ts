import { Request, Response, NextFunction } from "express";

import { UserInterface } from "../../models/users/interfaces/user";
import { bcryptCompare } from "./helpers/bcryptCompare";
import { User } from '../../models/users/User';
import { errorHandle } from "../errors/errorHandle";



export const login = (req: Request, res: Response, next: NextFunction) => {
  const user: UserInterface = req.body.user;
  (async () => {
    const matchedUser = await User.findUser(user).catch(err => next(errorHandle(err, 500)));    
    if(matchedUser){ 
      const doMatch = await bcryptCompare(user.password, matchedUser.password).catch(err => next(errorHandle(err, 500)));
      if(doMatch === undefined) return; 
      res.status(200).json({
        message: doMatch ? "Jesteś zalogowany!" : "Nieprawidłowe hasło lub login!"
      })   
    }else{ 
      res.status(200).json({
        message: "Nieprawidłowe hasło lub login!"
      })  
     }                               
  })();   
}


