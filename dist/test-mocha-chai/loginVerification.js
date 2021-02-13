"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const User_1 = require("../src/models/users/User");
const validator_1 = require("../src/models/validator/validator");
describe("loginVerification", function () {
    it("should thrown an error if accessing the database fails", function () {
        sinon_1.default.stub(User_1.User, "findUser");
        User_1.User.findUser.throws();
        const req = {
            body: {
                email: "test@t.com",
                password: "testtest"
            }
        };
        validator_1.Validator.loginVerificaton().custom(validator_1.customHandlerForLogin(req)).then(res => console.log(res));
        User_1.User.findUser.restore();
    });
});
