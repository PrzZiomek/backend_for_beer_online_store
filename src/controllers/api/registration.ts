import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { User } from "../../models/users/userInterface";
import { saveUser } from "../../models/users/saveUser";
import { checkIfSuchUserAlreadyRegistered } from "./helpers/checkIfSuchUserAlreadyRegistered";
import { promiseWrapper } from "./helpers/promiseWrapper";



export const registration = (req: Request, res: Response) => {
    const user: User = req.body.user;
    checkIfSuchUserAlreadyRegistered(user, (userFound: boolean) => {
        if(userFound){ 
          res.status(200).json({
            message: "Istnieje juz konto z takimi danymi"
          })     
        }else{   
          promiseWrapper(() => bcrypt.hash(user.password, 12), (hashedPswd: any) => { 
            let password = hashedPswd;
            saveUser({ ...user, password });
            res.status(200).json({
              message: "Rejestracja się udała"
            });            
        })  
      }
    }) 
}