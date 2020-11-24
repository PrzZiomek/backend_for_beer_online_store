"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptCompare = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.bcryptCompare = async (userPswd, userDBPswd) => {
    const compared = await bcryptjs_1.default.compare(userPswd, userDBPswd);
    return compared;
};
