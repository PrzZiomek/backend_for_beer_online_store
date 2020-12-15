"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facade = void 0;
class Facade {
    constructor(validator) {
        this.options = {};
        // this.validateMethods(validator);
        this.options = this.validateMethods(validator);
    }
    validateMethods(validator) {
        return {
            registration: [
                validator.checkEmail(),
                validator.checkPasswordLength(),
                validator.checkName(),
                validator.checkSurname(),
                validator.checkIfRegulationsAccept(),
                validator.checkPasswordrepeating(),
                validator.checkIfUserAccountExist()
            ],
            login: [
                validator.checkEmail(),
                validator.checkPasswordLength(),
                validator.loginVerificaton()
            ]
        };
    }
    validate(input) {
        return this.options[input];
    }
}
exports.Facade = Facade;
