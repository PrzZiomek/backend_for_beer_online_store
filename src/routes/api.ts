import { Router } from "express";

import { registration, logout } from "../controllers/api/api";

const router = Router();


router.post("/api/registration", registration)

router.post("/api/logout", logout)

 // /api/auth - take into account

 export const apiRoutes = router;
