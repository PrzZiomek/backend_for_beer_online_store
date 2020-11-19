import { Router } from "express";

import { login } from "../../controllers/api/login";
import { registration } from "../../controllers/api/registration";
import { logout } from "../../controllers/api/logout";


const router = Router();


router.post("/api/registration", registration);

router.post("/api/login", login);


router.post("/api/logout", logout);


 export const apiRoutes = router;
