import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';

import { UserInterface } from "../../models/users/interfaces/user";
import { User } from "../../models/users/User";
import { errorHandle } from "../errors/errorHandle";



export const registration = (req: Request, res: Response, next: NextFunction) => {
  const user: UserInterface = req.body.user;
  (async () => {
      const matchedUser = await User.findUser(user).catch(err => next(errorHandle(err, 500)));    
      if(matchedUser){   
        res.status(200).json({
          message: "Istnieje juz konto z takimi danymi"
        })  
      }else{
        const hashedPswd = await bcrypt.hash(user.password, 12).catch(err => next(errorHandle(err, 500)));
        if(!hashedPswd) return;
        let password = hashedPswd;
        User.saveUser({ ...user, password });
        res.status(200).json({
          message: "Rejestracja się udała"
        });    
      }   
  })();      
}







