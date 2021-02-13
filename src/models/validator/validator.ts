import { check, body, ValidationChain } from "express-validator";
import bcrypt from 'bcryptjs';

import { UserInterface, UserEmail } from "../users/interfaces/user";
import { User } from "../users/User";
import { ValidatorClassInterface } from "./interfaces";
import { errorHandle } from "../../controllers/errors/errorHandle";

export const Validator: ValidatorClassInterface = class {

    static checkEmail(): ValidationChain {
      return check('email')
              .isEmail()
              .withMessage("please enter the valid email")
              .normalizeEmail()
    }

    static checkPasswordLength(): ValidationChain {
      return body(
              "password",
              "please enter the password with at least 8 and max 12 characters"
              )
              .trim()
              .isLength({ min: 8, max: 12 })             
    }

    static checkName(): ValidationChain {
      return body(
              "name",
              "please enter the name with at least 2 and max 12 characters, without numbers"
             )
             .isLength({ min: 2, max: 12 })
             .isAlpha()    
    }

    static checkSurname(): ValidationChain {
      return body(
              "surname",
              "please enter the surname with at least 2 and max 12 characters, without numbers"
            )
            .isLength({ min: 2, max: 12 })
            .isAlpha()
    }

    static checkIfRegulationsAccept(): ValidationChain {
      return body("acceptRegulations")
              .custom((checked) => { 
                if(!checked){
                    throw new Error("to processing data further you must accept regulations");
                }
                return true;
              })
    }

    static checkPasswordrepeating(): ValidationChain {
      return body("confirmPassword")
              .trim() 
              .custom((value, { req }) => {
                if(value !== req.body.password){
                throw new Error("please repeat password");
                }
                return true;
                })                     
    }

    static checkIfUserAccountExist(): ValidationChain {
      return body("confirmPassword")
              .trim() 
              .custom( async (_, { req }) => {
                const user: UserInterface = req.body; 
                const matchedUser = await User.findUser(user).catch(err => console.log(err) /* next(errorHandle(err, 500))*/);    
                if(matchedUser){
                    return Promise.reject("Istnieje juz konto z takimi danymi")
                } 
             })
    }

    static loginVerificaton(): ValidationChain {
      return body("password")
              .trim()
              .custom(async (_, { req }) => {
                const user: UserInterface = req.body; 
                const userEmail: UserEmail = { type: "userEmail", email: user.email };
                const matchedUser = await User.findUser(userEmail).catch(err =>{ throw errorHandle(err, 401)} )  as UserInterface; 
                if(matchedUser){ 
                  const doMatch = await bcrypt.compare(user.password, matchedUser.password).catch(err => { throw errorHandle(err, 500)} );
                  if(doMatch === undefined) return;       
                  if(!doMatch){  
                    return Promise.reject("Nieprawidłowe hasło lub login!");
                  }
                }else{
                    return Promise.reject("Nieprawidłowe hasło lub login!");
                };
                return;
              }); 
          }
}