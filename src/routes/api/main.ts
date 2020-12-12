import { Router } from "express";
import { check, body } from "express-validator"
import bcrypt from 'bcryptjs';

import { login } from "../../controllers/api/login";
import { registration } from "../../controllers/api/registration";
import { sendJwt } from "../../controllers/api/sendJwt";
import { isAuth } from "../../middleware/isAuth";
import { UserInterface, UserOrEmail } from "../../models/users/interfaces/user";
import { User } from "../../models/users/User";


const router = Router();


router.get("/api/jwt", sendJwt);

router.post(
    "/api/registration",
    [
        check('email')
          .isEmail()
          .withMessage("please enter the valid email"),
        body(
            "password",
            "please enter the password with at least 8 and max 12 characters"
          )
          .isLength({ min: 8, max: 12 }),
          body(
            "name",
            "please enter the name with at least 2 and max 12 characters, without numbers"
          )
          .isLength({ min: 2, max: 12 })
          .isAlpha(),       
          body(
            "surname",
            "please enter the surname with at least 2 and max 12 characters, without numbers"
          )
          .isLength({ min: 2, max: 12 })
          .isAlpha(),
          body("acceptRegulations")
            .custom((checked) => { 
                if(!checked){
                    throw new Error("to processing data further you must accept regulations");
                }
                return true;
            }),
          body("confirmPassword")
            .custom((value, { req }) => {
                if(value !== req.body.password){
                    throw new Error("please repeat password");
                }
                return true;
            })
            .custom( async (_, { req }) => {
              const user: UserInterface = req.body; 
              const matchedUser = await User.findUser(user).catch(err => console.log(err) /* next(errorHandle(err, 500))*/);    
              if(matchedUser){
                return Promise.reject("Istnieje juz konto z takimi danymi")
              } 
          })
     ],
     isAuth, registration
    );


router.post(
    "/api/login",
    [
      check('email')
        .isEmail()
        .withMessage("please enter the valid email"),
      body(
          "password",
          "please enter the password with at least 8 and max 12 characters"
        )
        .custom( async (_, { req }) => {
          const user: UserInterface = req.body; 
          const userEmail: UserOrEmail = { type: "userEmail", email: user.email };
          const matchedUser = await User.findUser(userEmail).catch(err => console.log(err) /* next(errorHandle(err, 500))*/)  as UserInterface; 
          if(matchedUser){  
            const doMatch = await bcrypt.compare(user.password, matchedUser.password).catch(err => console.log(err) /* next(errorHandle(err, 500))*/);
            if(doMatch === undefined) return;         
            if(!doMatch){
              return Promise.reject("Nieprawidłowe hasło lub login!");
            }
          }else{
            return Promise.reject("Nieprawidłowe hasło lub login!");
          } 
        })       
    ],
     isAuth, login
   );


 export const apiRoutes = router;
