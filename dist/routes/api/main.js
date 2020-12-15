"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const login_1 = require("../../controllers/api/login");
const registration_1 = require("../../controllers/api/registration");
const sendJwt_1 = require("../../controllers/api/sendJwt");
const isAuth_1 = require("../../middleware/isAuth");
const validator_1 = require("../../models/validator/validator");
const validatorFacade_1 = require("../../models/validatorFacade");
const router = express_1.Router();
const facade = new validatorFacade_1.Facade(validator_1.Validator);
router.get("/api/jwt", sendJwt_1.sendJwt);
router.post("/api/registration", facade.validate("registration"), isAuth_1.isAuth, registration_1.validationStatement, registration_1.registration);
router.post("/api/login", facade.validate("login"), isAuth_1.isAuth, login_1.login);
exports.apiRoutes = router;
/*

check('email')
       .isEmail()
       .withMessage("please enter the valid email"),
     body(
         "password",
         "please enter the password with at least 8 and max 12 characters"
       )
       .custom( async (_, { req }) => {
         const user = req.body;
         const matchedUser = await User.findUser(user.email).catch(err => console.log(err) )  as UserInterface;
         if(matchedUser){
           const doMatch = await bcrypt.compare(user.password, matchedUser.password).catch(err => console.log(err) );
           if(doMatch === undefined) return;
           if(!doMatch){
             return Promise.reject("Nieprawidłowe hasło lub login!");
           }
         }else{
           return Promise.reject("Nieprawidłowe hasło lub login!");
         }
       })


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
             const matchedUser = await User.findUser(user).catch(err => console.log(err) );
             if(matchedUser){
               return Promise.reject("Istnieje juz konto z takimi danymi")
             }
         })

 */ 
