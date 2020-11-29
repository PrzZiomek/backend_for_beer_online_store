"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandle_1 = require("../controllers/errors/errorHandle");
exports.isAuth = (req, res, next) => {
    const isHeader = req.get("Authorization");
    if (!isHeader)
        throw errorHandle_1.errorHandle("Not authentcated", 401);
    let token = isHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, "averycryptictoken");
    }
    catch (err) {
        throw errorHandle_1.errorHandle(err, 500);
    }
    if (!decodedToken)
        throw errorHandle_1.errorHandle("Not authenticated", 401);
    next();
};
