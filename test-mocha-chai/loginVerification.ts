import { expect } from "chai";
import sinon from 'sinon';
import { Request } from "express";

import { User } from "../src/models/users/User";
import { Validator, customHandlerForLogin } from "../src/models/validator/validator";


describe("loginVerification", function(){

    it("should thrown an error if accessing the database fails", function(){
        sinon.stub(User, "findUser");
        User.findUser.throws()
        const req: Partial<Request> = {
            body: {
                email: "test@t.com",
                password: "testtest"
            }
        }
        Validator.loginVerificaton().custom(customHandlerForLogin(req)).then(res => console.log(res));
        User.findUser.restore();
    })
})