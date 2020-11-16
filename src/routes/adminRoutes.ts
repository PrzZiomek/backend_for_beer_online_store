import { Router } from "express";

import { registrationData, main, user } from "../controllers/admin/admin";

const router = Router();


router.get("/", main)

router.get("/user", user)

router.post("/api/registration", registrationData)

 // /api/auth - take into account

 export const adminRoutes = router;