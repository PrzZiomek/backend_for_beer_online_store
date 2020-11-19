"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resToClientRoute = void 0;
const express_1 = require("express");
const resToClient_1 = require("../controllers/resToClient/resToClient");
const router = express_1.Router();
router.get("/to-client/user-already-exists", resToClient_1.userAlreadyExistResponse);
exports.resToClientRoute = router;
