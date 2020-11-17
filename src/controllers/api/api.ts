import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { User } from "../../models/users/userInterface";
import { saveUser } from "../../models/users/saveUser";
import { checkIfUserAlreadyRegistered } from "./helpers/checkIfUserAlreadyRegistered";


export const registration = (req: Request, res: Response) => {
    const user: User = req.body.user;
    checkIfUserAlreadyRegistered(user, (userFound: boolean) => {
        if(userFound){      
            console.log("Istnieje juz konto z takimi danymi");            
        }else{   
          wrapPromise((() => bcrypt.hash(user.password, 12)), (res: any) => { 
            let password = res;
            saveUser({ ...user, password });
          })  
          res.redirect("/user");          
        }
    }) 
}




/*
export const registration = (req: Request, res: Response) => {
    const user: User = req.body.user;
    checkIfUserAlreadyRegistered(user, (userFound: boolean) => {
        if(userFound){      
            console.log("Istnieje juz konto z takimi danymi");            
        }else{          
          bcrypt.hash(user.password, 12)
            .then((hashedPswd) => {
                let password = hashedPswd 
                saveUser({ ...user, password })
            })
            .then(() => res.redirect("/user"))
            .catch((err) => console.log(err))
        }
    }) 
}
*/

  export const logout = (req: Request, res: Response) => {
      req.session.destroy((err: Error) => err && console.log(err))
  }