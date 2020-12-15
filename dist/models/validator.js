"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("./users/User");
exports.Validator = class {
    static checkEmail() {
        return express_validator_1.check('email')
            .isEmail()
            .withMessage("please enter the valid email");
    }
    static checkPasswordLength() {
        return express_validator_1.body("password", "please enter the password with at least 8 and max 12 characters")
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
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("please repeat password");
            }
            return true;
        });
    }
    static checkIfUserAccountExist() {
        return express_validator_1.body("confirmPassword")
            .custom(async (_, { req }) => {
            const user = req.body;
            const matchedUser = await User_1.User.findUser(user).catch(err => console.log(err) /* next(errorHandle(err, 500))*/);
            if (matchedUser) {
                return Promise.reject("Istnieje juz konto z takimi danymi");
            }
        });
    }
};
