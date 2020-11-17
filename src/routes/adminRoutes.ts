import { Router } from "express";

import { main, user } from "../controllers/admin/admin";

const router = Router();


router.get("/", main)

router.get("/user", user)

 export const adminRoutes = router;