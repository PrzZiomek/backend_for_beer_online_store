import { Router } from "express";

import { main, user, errorPage } from "../controllers/admin/admin";

const router = Router();


router.get("/", main)

router.get("/user", user)

router.get("/errors", errorPage)

 export const adminRoutes = router;