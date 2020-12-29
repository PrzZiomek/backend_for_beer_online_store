"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth_1 = require("../middleware/isAuth");
it("should throw an error if no authorization with header occurs", function () {
    const req = {
        get: function () {
            return undefined;
        }
    };
    const res = {};
    chai_1.expect(isAuth_1.isAuth.bind(this, req, res, () => { })).to.throw("Not authenticated");
});
it("should throw an error if the authorization header is only one string", function () {
    const req = {
        get: function () {
            return "abc";
        }
    };
    const res = {};
    chai_1.expect(isAuth_1.isAuth.bind(this, req, res, () => { })).to.throw();
});
it("should throw an error if the token cannot be verified", function () {
    const req = {
        get: function () {
            return "Bearer abc";
        }
    };
    const res = {};
    chai_1.expect(isAuth_1.isAuth.bind(this, req, res, () => { })).to.throw();
});
it("token should has a iat property", function () {
    const req = {
        get: function () {
            return "Bearer dfgsgtrjngcrhnjhcds";
        }
    };
    sinon_1.default.stub(jsonwebtoken_1.default, "verify");
    jsonwebtoken_1.default.verify.returns({ tokenIat: 123 });
    const res = {};
    isAuth_1.isAuth(req, res, () => { });
    chai_1.expect(req).to.have.property("tokenIat");
    chai_1.expect(jsonwebtoken_1.default.verify.called).to.be.true;
    jsonwebtoken_1.default.verify.restore();
});
