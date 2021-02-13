"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth_1 = require("../../middleware/isAuth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe("isAuth middleware tests", () => {
    it("should throw an error if no authorization with header occurs", () => {
        const req = {
            get: () => null,
        };
        const res = {};
        function expectedErr() {
            isAuth_1.isAuth(req, res, () => { });
        }
        expect(expectedErr).toThrowError();
    });
    it("should throw an error if authorization header is only one string", () => {
        const req = {
            get: () => "abc"
        };
        const res = {};
        function expectedErr() {
            isAuth_1.isAuth(req, res, () => { });
        }
        expect(expectedErr).toThrowError();
    });
    it("should has a iat property", () => {
        const { verify } = jsonwebtoken_1.default;
        //        verify.mockReturnValue({tokenIat: 123})
    });
});
