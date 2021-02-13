import { expect } from "chai";
import sinon from 'sinon';
import { Request } from "express";

import { User } from "../src/models/users/User";


describe("User's methods", function(){

    it("should thrown an error if accessing the database fails", function(){
        sinon.stub(User, "findUser");
        User.findUser.throws()
        const req: Partial<Request> = {
            body: {
                email: "test@t.com",
                password: "testtest"
            }
        }
        User.findUser.restore();
    })
})