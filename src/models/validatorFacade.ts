import { ValidatorClassInterface, validateOptionsInterface } from "./validator/interfaces";
import { ValidationChain } from "express-validator";


export class Facade {

    protected options: validateOptionsInterface = {};
    protected validateMethods(validator: ValidatorClassInterface){
        return {
            registration:[
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
      }      
    }

    constructor(validator: ValidatorClassInterface) {
        this.options = this.validateMethods(validator);
    }

    public validate(input: string): ValidationChain[]{
      return this.options[input];
   }
}