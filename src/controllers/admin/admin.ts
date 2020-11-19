import { Request, Response } from "express";

import { fetchAllUsers } from "../../models/users/fetchAllUsers"


export const main = (_ : Request, res: Response) => {
    res.send("<h3>Welcome to Node.js server!!!</h3>");
  }


export const user = (req: Request, res: Response) => {
    res.send("<p>user data logged</p>");
    req.session.save((err: Error) =>  console.log(err))
    req.session.registered = true;
    fetchAllUsers() 
      .then(res => { 
         const rows = res[0]
         const field = res[1];
        // console.log(rows);        
      })
      .catch(err => console.log(err))
  }



 
