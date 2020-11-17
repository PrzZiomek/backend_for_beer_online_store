import { Router } from "express";

import { registrationData, logout } from "../controllers/api/api";

const router = Router();


router.post("/api/registration", registrationData)

router.post("/api/logout", logout)

 // /api/auth - take into account

 export const apiRoutes = router;
