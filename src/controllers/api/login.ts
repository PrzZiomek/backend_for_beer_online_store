import { Request, Response } from "express";

import { UserInterface } from "../../models/users/interfaces/user";
import { bcryptCompare } from "./helpers/bcryptCompare";
import { User } from '../../models/users/User';



export const login = (req: Request, res: Response) => {
  const user: UserInterface = req.body.user;
  (async () => {
    const matchedUser = await User.findUser(user).catch(err => console.log(err));    
    if(matchedUser){ 
      const doMatch = await bcryptCompare(user.password, matchedUser.password).catch(err => console.log(`match Passwords: ${err}`));
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


