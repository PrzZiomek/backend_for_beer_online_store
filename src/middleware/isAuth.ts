import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorHandle } from '../controllers/errors/errorHandle';


export const isAuth = (req: Request, res: Response, next: NextFunction) => { 
    const isHeader = req.get("Authorization");    
    if(!isHeader) throw errorHandle("Not authentcated", 401);
    let token = isHeader.split(" ")[1];
    let decodedToken;
    try{
         decodedToken = jwt.verify(token, "averycryptictoken");
    } catch(err){      
        throw errorHandle(err, 500);
    }
    if(!decodedToken) throw errorHandle("Not authenticated", 401);
    next();
}