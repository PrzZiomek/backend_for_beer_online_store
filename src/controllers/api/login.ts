import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { User } from "../../models/users/userInterface";
import { promiseWrapper } from "./helpers/promiseWrapper";
import { fetchAllUsers } from "../../models/users/fetchAllUsers";
import { searchForUser } from "./helpers/searchForUser";



export const login = (req: Request, res: Response) => {
    const user: User = req.body.user;
    promiseWrapper(fetchAllUsers, (resDB: any) => { 
      const rows = resDB[0] 
      const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));  
      const matchedUser = usersFromDB.find(item => searchForUser(item, user)) as User;
      if(matchedUser){ 
        bcrypt.compare(user.password, matchedUser.password)
          .then(doMatch => {
              res.status(200).json({
                message: doMatch ? "Jesteś zalogowany!" : "Nieprawidłowe hasło lub login!"
              })   
          }).catch(err => console.log(err))
        }else{
          res.status(200).json({
            message: "Nieprawidłowe hasło lub login!"
          })  
        }                        
  })       
}




