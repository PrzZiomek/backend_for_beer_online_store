import { ExtendedError } from "./extendedErrorClass";

 
 


export const errorHandle = (err: string, statusCode: number) => {
    const error  = new ExtendedError(err);
    error.httpStatusCode = statusCode;
  return error;
}