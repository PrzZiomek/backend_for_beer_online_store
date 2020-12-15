import { ValidationChain } from "express-validator";


export interface ValidatorClassInterface {
    checkEmail(): ValidationChain;
    checkPasswordLength(): ValidationChain;
    checkName(): ValidationChain;
    checkSurname(): ValidationChain;
    checkIfRegulationsAccept(): ValidationChain;
    checkPasswordrepeating(): ValidationChain;
    checkIfUserAccountExist(): ValidationChain;
    loginVerificaton(): ValidationChain;
}

export interface validateOptionsInterface {
    [key: string]: ValidationChain[];
   // registration: ValidationChain[];
  //  login: ValidationChain[];
}