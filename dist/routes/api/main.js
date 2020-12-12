"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login_1 = require("../../controllers/api/login");
const registration_1 = require("../../controllers/api/registration");
const sendJwt_1 = require("../../controllers/api/sendJwt");
const isAuth_1 = require("../../middleware/isAuth");
const User_1 = require("../../models/users/User");
//import { bcryptCompare } from "../../controllers/api/helpers/bcryptCompare";
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
    }),
    express_validator_1.body("confirmPassword")
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("please repeat password");
        }
        return true;
    })
        .custom(async (_, { req }) => {
        const user = req.body;
        const matchedUser = await User_1.User.findUser(user).catch(err => console.log(err) /* next(errorHandle(err, 500))*/);
        if (matchedUser) {
            return Promise.reject("Istnieje juz konto z takimi danymi");
        }
    })
], isAuth_1.isAuth, registration_1.registration);
router.post("/api/login", [
    express_validator_1.check('email')
        .isEmail()
        .withMessage("please enter the valid email"),
    express_validator_1.body("password", "please enter the password with at least 8 and max 12 characters")
        .custom(async (_, { req }) => {
        const user = req.body;
        const userEmail = { type: "userEmail", email: user.email };
        const matchedUser = await User_1.User.findUser(userEmail).catch(err => console.log(err) /* next(errorHandle(err, 500))*/);
        if (matchedUser) {
            const doMatch = await bcryptjs_1.default.compare(user.password, matchedUser.password).catch(err => console.log(err) /* next(errorHandle(err, 500))*/);
            if (doMatch === undefined)
                return;
            if (!doMatch) {
                return Promise.reject("Nieprawidłowe hasło lub login!");
            }
        }
        else {
            return Promise.reject("Nieprawidłowe hasło lub login!");
        }
    })
], isAuth_1.isAuth, login_1.login);
exports.apiRoutes = router;
