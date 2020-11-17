"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.registration = exports.wrapPromise = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saveUser_1 = require("../../models/users/saveUser");
const checkIfUserAlreadyRegistered_1 = require("./helpers/checkIfUserAlreadyRegistered");
exports.wrapPromise = (fn, cb) => {
    Promise.resolve(fn())
        .then(res => cb(res))
        .catch(err => console.log(err));
};
exports.registration = (req, res) => {
    const user = req.body.user;
    checkIfUserAlreadyRegistered_1.checkIfUserAlreadyRegistered(user, (userFound) => {
        if (userFound) {
            console.log("Istnieje juz konto z takimi danymi");
        }
        else {
            exports.wrapPromise((() => bcryptjs_1.default.hash(user.password, 12)), (res) => {
                let password = res;
                saveUser_1.saveUser({ ...user, password });
            });
            res.redirect("/user");
        }
    });
};
/*
export const registration = (req: Request, res: Response) => {
    const user: User = req.body.user;
    checkIfUserAlreadyRegistered(user, (userFound: boolean) => {
        if(userFound){
            console.log("Istnieje juz konto z takimi danymi");
        }else{
          bcrypt.hash(user.password, 12)
            .then((hashedPswd) => {
                let password = hashedPswd
                saveUser({ ...user, password })
            })
            .then(() => res.redirect("/user"))
            .catch((err) => console.log(err))
        }
    })
}
*/
exports.logout = (req, res) => {
    req.session.destroy((err) => err && console.log(err));
};
