import { Request, Response } from "express";
import { ResultSetHeader, FieldPacket } from 'mysql2';

import { fetchAllUsers } from "../../models/users/saveUser";
import { RowDataOrOkPacketTuple } from "./types";


export const main = (_ : Request, res: Response) => {
    res.send("<h3>Welcome to Node.js server!!!</h3>");
  }

export const user = (req: Request, res: Response) => {
    res.send("<p>user data logged</p>");
    //console.log(req.get("Cookie"));  registered=true
    //console.log(req.session); Session { cookie: {...}}
    req.session.save((err: Error) => err && console.log(err))
    req.session.registered = true;
    fetchAllUsers() 
      .then(res => { 
         const rows = res[0]
         const field = res[1];
        //console.log(rows);     
      })
      .catch(err => console.log(err))
  }



 
