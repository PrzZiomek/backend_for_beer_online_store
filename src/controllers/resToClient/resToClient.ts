import { Request, Response } from "express";
import SSE from 'express-sse-ts';


export const userAlreadyExistResponse = (req: Request, res: Response) => {
  

   req.on("close", () => console.log("connection closed") )
         
  }
