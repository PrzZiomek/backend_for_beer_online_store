import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { User } from "../../models/users/userInterface";
import { fetchAllUsers } from "../../models/users/fetchAllUsers";
import { searchForUser } from "./helpers/searchForUser";



export const login = (req: Request, res: Response) => {
    const user: User = req.body.user;
    (async () => {
      const resDB = await fetchAllUsers().catch(err => console.log(`req to database: ${err}`));
      if(!resDB) return;
      const rows = resDB[0] as User[];
      const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));  
      const matchedUser = usersFromDB.find(item => searchForUser(item, user)) as User;
      if(matchedUser){ 
        const doMatch = await bcrypt.compare(user.password, matchedUser.password).catch(err => console.log(`match Passwords: ${err}`));
        if(!doMatch) return;
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




