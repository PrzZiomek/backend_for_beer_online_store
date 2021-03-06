"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../users/User");
const errorHandle_1 = require("../../controllers/errors/errorHandle");
const Validator = class {
    static checkEmail() {
        return express_validator_1.check('email')
            .isEmail()
            .withMessage("please enter the valid email")
            .normalizeEmail();
    }
    static checkPasswordLength() {
        return express_validator_1.body("password", "please enter the password with at least 8 and max 12 characters")
            .trim()
            .isLength({ min: 8, max: 12 });
    }
    static checkName() {
        return express_validator_1.body("name", "please enter the name with at least 2 and max 12 characters, without numbers")
            .isLength({ min: 2, max: 12 })
            .isAlpha();
    }
    static checkSurname() {
        return express_validator_1.body("surname", "please enter the surname with at least 2 and max 12 characters, without numbers")
            .isLength({ min: 2, max: 12 })
            .isAlpha();
    }
    static checkIfRegulationsAccept() {
        return express_validator_1.body("acceptRegulations")
            .custom((checked) => {
            if (!checked) {
                throw new Error("to processing data further you must accept regulations");
            }
            return true;
        });
    }
    static checkPasswordrepeating() {
        return express_validator_1.body("confirmPassword")
            .trim()
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("please repeat password");
            }
            return true;
        });
    }
    static checkIfUserAccountExist() {
        return express_validator_1.body("confirmPassword")
            .trim()
            .custom(async (_, { req }) => {
            const user = req.body;
            const matchedUser = await User_1.User.findUser(user).catch(err => console.log(err) /* next(errorHandle(err, 500))*/);
            if (matchedUser) {
                return Promise.reject("Istnieje juz konto z takimi danymi");
            }
        });
    }
    static loginVerificaton() {
        return express_validator_1.body("password")
            .trim()
            .custom(async (_, { req }) => {
            const user = req.body;
            const userEmail = { type: "userEmail", email: user.email };
            const matchedUser = await User_1.User.findUser(userEmail).catch(err => { throw errorHandle_1.errorHandle(err, 401); });
            if (matchedUser) {
                const doMatch = await bcryptjs_1.default.compare(user.password, matchedUser.password).catch(err => { throw errorHandle_1.errorHandle(err, 500); });
                if (doMatch === undefined)
                    return;
                if (!doMatch) {
                    return Promise.reject("Nieprawidłowe hasło lub login!");
                }
            }
            else {
                return Promise.reject("Nieprawidłowe hasło lub login!");
            }
            ;
            return;
        });
    }
};
exports.Validator = Validator;
