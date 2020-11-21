import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { User } from "../../models/users/userInterface";
import { saveUser } from "../../models/users/saveUser";
import { checkIfSuchUserIsAlready } from "./helpers/checkIfSuchUserIsAlready";
import { fetchAllUsers } from "../../models/users/fetchAllUsers";


export const registration = (req: Request, res: Response) => {
  const user: User = req.body.user;
  (async () => {
      const resDB = await fetchAllUsers().catch(err => console.log(`req to database: ${err}`));
      if(!resDB) return;
      const rows = resDB[0] as User[];
      const userFound = checkIfSuchUserIsAlready(rows, user);   
      if(userFound){ 
        res.status(200).json({
          message: "Istnieje juz konto z takimi danymi"
        })  
      }else{
        const hashedPswd = await bcrypt.hash(user.password, 12).catch(err => console.log(`hashing password: ${err}`));
        if(!hashedPswd) return;
        let password = hashedPswd;
        saveUser({ ...user, password });
        res.status(200).json({
          message: "Rejestracja się udała"
        });    
      }   
  })();      
}




