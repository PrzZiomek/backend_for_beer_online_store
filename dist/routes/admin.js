"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const admin_1 = require("../controllers/admin/admin");
const router = express_1.Router();
router.get("/", admin_1.main);
router.get("/user", admin_1.user);
exports.adminRoutes = router;
