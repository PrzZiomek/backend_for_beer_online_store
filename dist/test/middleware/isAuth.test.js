"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth_1 = require("../../src/middleware/isAuth");
describe("isAuth middleware tests", () => {
    it("first test", () => {
        const req = {
            get: function () {
                return null;
            }
        };
        const res = {};
        function expectedErr() {
            isAuth_1.isAuth(req, res, () => { });
        }
        expect(expectedErr).toThrowError();
    });
});
