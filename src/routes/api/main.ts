import { Router } from "express";
import { check, body } from "express-validator"

import { login } from "../../controllers/api/login";
import { registration } from "../../controllers/api/registration";
import { sendJwt } from "../../controllers/api/sendJwt";
import { isAuth } from "../../middleware/isAuth";


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
        .isLength({ min: 8, max: 12 })
    ],
     isAuth, login
   );


 export const apiRoutes = router;
