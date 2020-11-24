"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptCompare_1 = require("./helpers/bcryptCompare");
const User_1 = require("../../models/users/User");
exports.login = (req, res) => {
    const user = req.body.user;
    (async () => {
        const matchedUser = await User_1.User.findUser(user).catch(err => console.log(err));
        if (matchedUser) {
            const doMatch = await bcryptCompare_1.bcryptCompare(user.password, matchedUser.password).catch(err => console.log(`match Passwords: ${err}`));
            if (doMatch === undefined)
                return;
            res.status(200).json({
                message: doMatch ? "Jesteś zalogowany!" : "Nieprawidłowe hasło lub login!"
            });
        }
        else {
            res.status(200).json({
                message: "Nieprawidłowe hasło lub login!"
            });
        }
    })();
};
