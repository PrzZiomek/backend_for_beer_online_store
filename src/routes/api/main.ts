import { Router } from "express";

import { login } from "../../controllers/api/login";
import { registration, validationMessage } from "../../controllers/api/registration";
import { sendJwt } from "../../controllers/api/sendJwt";
import { isAuth } from "../../middleware/isAuth";
import { Validator } from "../../models/validator/validator";
import { Facade } from "../../models/validatorFacade";


const router = Router();
const facade = new Facade(Validator);


router.get("/api/jwt", sendJwt);

router.post(
    "/api/registration",
     facade.validate("registration"),
     isAuth,
     validationMessage, 
     registration
    );


router.post(
    "/api/login",
    facade.validate("login"),
    isAuth, 
    login
   );


 export const apiRoutes = router;



