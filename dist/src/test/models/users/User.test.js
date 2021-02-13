"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("ts-jest/utils");
const User_1 = require("../../../models/users/User");
jest.mock("../../../models/users/User", () => {
    return {
        User: jest.fn().mockImplementation(() => {
            return {
                findUser: () => { },
            };
        })
    };
});
describe("User's methods", function () {
    const MockedUser = utils_1.mocked(User_1.User, true);
    beforeEach(() => {
        MockedUser.mockClear();
    });
    it("should thrown an error if accessing the database fails", function () {
        const userEmail = {
            type: "userEmail",
            email: "pz4@wp.pl"
        };
        /* function expectedErr(){
             isAuth(req, res, () => {})
          } */
        MockedUser.findUser(userEmail).then(res => {
            expect(res).toThrowError();
        });
    });
});
