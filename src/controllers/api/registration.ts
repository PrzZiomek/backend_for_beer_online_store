import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { UserInterface } from "../../models/users/interfaces/user";
import { User } from "../../models/users/User";



export const registration = (req: Request, res: Response) => {
  const user: UserInterface = req.body.user;
  (async () => {
      const matchedUser = await User.findUser(user).catch(err => console.log(err));    
      if(matchedUser){   
        res.status(200).json({
          message: "Istnieje juz konto z takimi danymi"
        })  
      }else{
        const hashedPswd = await bcrypt.hash(user.password, 12).catch(err => console.log(`hashing password: ${err}`));
        if(!hashedPswd) return;
        let password = hashedPswd;
        User.saveUser({ ...user, password });
        res.status(200).json({
          message: "Rejestracja się udała"
        });    
      }   
  })();      
}







