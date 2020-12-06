"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const login_1 = require("../../controllers/api/login");
const registration_1 = require("../../controllers/api/registration");
const sendJwt_1 = require("../../controllers/api/sendJwt");
const isAuth_1 = require("../../middleware/isAuth");
const router = express_1.Router();
router.get("/api/jwt", sendJwt_1.sendJwt);
router.post("/api/registration", [
    express_validator_1.check('email')
        .isEmail()
        .withMessage("please enter the valid email"),
    express_validator_1.body("password", "please enter the password with at least 8 and max 12 characters")
        .isLength({ min: 8, max: 12 }),
    express_validator_1.body("name", "please enter the name with at least 2 and max 12 characters, without numbers")
        .isLength({ min: 2, max: 12 })
        .isAlpha(),
    express_validator_1.body("surname", "please enter the surname with at least 2 and max 12 characters, without numbers")
        .isLength({ min: 2, max: 12 })
        .isAlpha(),
    express_validator_1.body("acceptRegulations")
        .custom((checked) => {
        if (!checked) {
            throw new Error("to processing data further you must accept regulations");
        }
        return true;
    })
], isAuth_1.isAuth, registration_1.registration);
router.post("/api/login", [
    express_validator_1.check('email')
        .isEmail()
        .withMessage("please enter the valid email"),
    express_validator_1.body("password", "please enter the password with at least 8 and max 12 characters")
        .isLength({ min: 8, max: 12 })
], isAuth_1.isAuth, login_1.login);
exports.apiRoutes = router;
