import { Request, Response } from 'express';
import { token } from '../../models/token/token';



export const sendJwt = (req: Request, res: Response) => {
   res.status(200).json({
        token
      })   
}