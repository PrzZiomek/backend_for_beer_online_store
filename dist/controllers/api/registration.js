"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saveUser_1 = require("../../models/users/saveUser");
const checkIfSuchUserIsAlready_1 = require("./helpers/checkIfSuchUserIsAlready");
const fetchAllUsers_1 = require("../../models/users/fetchAllUsers");
exports.registration = (req, res) => {
    const user = req.body.user;
    (async () => {
        const resDB = await fetchAllUsers_1.fetchAllUsers().catch(err => console.log(`req to database: ${err}`));
        if (!resDB)
            return;
        const rows = resDB[0];
        const userFound = checkIfSuchUserIsAlready_1.checkIfSuchUserIsAlready(rows, user);
        if (userFound) {
            res.status(200).json({
                message: "Istnieje juz konto z takimi danymi"
            });
        }
        else {
            const hashedPswd = await bcryptjs_1.default.hash(user.password, 12).catch(err => console.log(`hashing password: ${err}`));
            if (!hashedPswd)
                return;
            let password = hashedPswd;
            saveUser_1.saveUser({ ...user, password });
            res.status(200).json({
                message: "Rejestracja się udała"
            });
        }
    })();
};
