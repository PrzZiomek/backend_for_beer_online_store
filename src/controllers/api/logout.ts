import { Request, Response } from "express";


  export const logout = (req: Request, res: Response) => {
    req.session.destroy((err: Error) => err && console.log(err))
}