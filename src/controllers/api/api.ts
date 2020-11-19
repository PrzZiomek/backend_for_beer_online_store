import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { User } from "../../models/users/userInterface";
import { saveUser } from "../../models/users/saveUser";
import { checkIfUserAlreadyRegistered } from "./helpers/checkIfUserAlreadyRegistered";
import { promiseWrapper } from "./helpers/promiseWrapper";



export const registration = (req: Request, res: Response) => {
    const user: User = req.body.user;
    checkIfUserAlreadyRegistered(user, (userFound: boolean) => {
        if(userFound){ 
            res.redirect("/events");     //"/to-client/user-already-exists"  
        }else{   
          promiseWrapper(() => bcrypt.hash(user.password, 12), (res: any) => { 
            let password = res;
            saveUser({ ...user, password });
        })  
          res.redirect("/user");          
        }
    }) 
}





  export const logout = (req: Request, res: Response) => {
      req.session.destroy((err: Error) => err && console.log(err))
  }