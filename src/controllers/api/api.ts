import { Request, Response } from "express";

import { User } from "../../models/users/userInterface";
import { saveUser } from "../../models/users/saveUser";


export const registrationData = (req: Request, res: Response) => {
    const user: User = req.body.user;
    saveUser(user)
      .then(() => res.redirect("/user"))
      .catch((err) => err && console.log(err))
  }

  export const logout = (req: Request, res: Response) => {
      req.session.destroy((err: Error) => err && console.log(err))
  }