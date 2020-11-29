import { Router } from "express";

import { login } from "../../controllers/api/login";
import { registration } from "../../controllers/api/registration";
import { sendJwt } from "../../controllers/api/sendJwt";
import { isAuth } from "../../middleware/isAuth";


const router = Router();


router.get("/api/jwt", sendJwt);

router.post("/api/registration", isAuth, registration);

router.post("/api/login", isAuth, login);


 export const apiRoutes = router;
