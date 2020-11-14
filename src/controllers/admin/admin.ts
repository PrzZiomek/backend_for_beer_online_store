import { Request, Response } from "express";
import { ResultSetHeader, FieldPacket } from 'mysql2';

import { User } from "../../models/users/userInterface";
import { saveUser, fetchAllUsers } from "../../models/users/user";
import { RowDataOrOkPacketTuple } from "./types";



export const registrationData = (req: Request, res: Response) => {
    const user: User = req.body.user;
    saveUser(user)
      .then(() => res.redirect("/user"))
      .catch((err) => console.log(err))
  }


export const main = (_ : Request, res: Response) => {
    res.send("<h3>Welcome to Node.js server!!!</h3>");
  }


export const user = (_: Request, res: Response) => {
    res.send("<p>user data logged</p>");
    fetchAllUsers() 
      .then(res => {
        const [ rows, field ]: [RowDataOrOkPacketTuple | ResultSetHeader, FieldPacket[]] = res; 
        console.log(rows);     
      })
      .catch(err => console.log(err))
  }


  