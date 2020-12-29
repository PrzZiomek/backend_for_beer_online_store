import { Request, Response, NextFunction } from "express";
import { pool as db } from '../../util/database';

import { token } from '../../models/token/token';
import { errorHandle } from "../errors/errorHandle";


export const getCartContent = async () =>  {
  const resDB = await db.execute('SELECT * FROM shoppingCart');         
 return resDB[0];
}


export const cartContent = async (req: Request, res: Response, next: NextFunction) => {
  const shoppingCart = JSON.stringify(req.body); 
  db.execute(
    'INSERT INTO shoppingCart (shoppingCart) VALUES (?)',
    [ shoppingCart ]
  )
  // PROVISIONAL SOLUTION:
  const rows = await getCartContent().catch(err => next(errorHandle(err, 500)));
  if(!rows) return;
  const cartContFromDB = JSON.parse(JSON.stringify(rows));  
  if(!cartContFromDB.length){
    return res.status(422).json({
      message: 'koszyk pusty'
    });
  }else{
    res.status(200).json({
      message: "zawartość koszyka zapisana",
      cartContent: cartContFromDB,
      token,
    })   
  }   
                     
}


