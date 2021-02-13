import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorHandle } from '../controllers/errors/errorHandle';

interface tokenObj {
    iat: number;
}


export const isAuth = (req: Request, res: Response, next: NextFunction) => { 
    const isHeader = req.get("Authorization"); 
    if(!isHeader) throw errorHandle("Not authenticated", 401);
    let token = isHeader.split(" ")[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, "averycryptictoken") as tokenObj;  
    } catch(err){      
        throw errorHandle(err, 500);
    }
    if(!decodedToken) throw errorHandle("Not authenticated", 401);
    req.tokenIat = decodedToken.iat; 
    next();
}


