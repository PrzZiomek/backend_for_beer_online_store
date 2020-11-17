"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const api_1 = require("../controllers/api/api");
const router = express_1.Router();
router.post("/api/registration", api_1.registrationData);
router.post("/api/logout", api_1.logout);
// /api/auth - take into account
exports.apiRoutes = router;
