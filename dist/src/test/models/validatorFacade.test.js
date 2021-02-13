"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validatorFacade_1 = require("../../models/validatorFacade");
describe("validatorFacade test", () => {
    let validatorFacade;
    const validator = {};
    let optionsMock = {};
    const validateMethodsMock = jest.fn();
    beforeEach(() => {
        validatorFacade = new validatorFacade_1.Facade(validator);
    });
    /* test("validate method", () => {
 
         validatorFacade.validate("login");
 
     })
     */
});
