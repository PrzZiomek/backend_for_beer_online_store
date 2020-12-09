"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_validator_1 = require("express-validator");
const token_1 = require("../../models/token/token");
exports.login = async (req, res, next) => {
    const user = req.body;
    const validationErrors = express_validator_1.validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: validationErrors.array(),
        });
    }
    else {
        res.status(200).json({
            message: "Jesteś zalogowany",
            token: token_1.token,
        });
    }
};
/*
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserInterface = req.body.user;
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      return res.status(422).json({
        message: validationErrors.array(),
      });
    }
    const matchedUser = await User.findUser(user).catch(err => next(errorHandle(err, 500)));
    if(matchedUser){
      const doMatch = await bcryptCompare(user.password, matchedUser.password).catch(err => next(errorHandle(err, 500)));
      if(doMatch === undefined) return;
      res.status(200).json({
        message: doMatch ? "Jesteś zalogowany!" : "Nieprawidłowe hasło lub login!",
        userId: matchedUser.id,
        token,
      })
    }else{
      res.status(200).json({
        message: "Nieprawidłowe hasło lub login!",
      })
     }
}

*/
