"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const errorHandle_1 = require("../controllers/errors/errorHandle");
const isAuth = (req, res, next) => {
    const isHeader = req.get("Authorization");
    if (!isHeader)
        throw errorHandle_1.errorHandle("Not authenticated", 401);
    let token = isHeader.split(" ")[1];
    let decodedToken;
    try {
        // decodedToken = jwt.verify(token, "averycryptictoken");  
        decodedToken = { iat: 1233 };
    }
    catch (err) {
        throw errorHandle_1.errorHandle(err, 500);
    }
    if (!decodedToken)
        throw errorHandle_1.errorHandle("Not authenticated", 401);
    req.tokenIat = token.iat;
    next();
};
exports.isAuth = isAuth;