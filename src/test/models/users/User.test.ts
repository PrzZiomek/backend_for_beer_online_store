import { mocked } from 'ts-jest/utils';

import { User } from "../../../models/users/User";
import { UserEmail } from '../../../models/users/interfaces/user';



describe("User's methods", function(){

   

    it("should thrown an error if accessing the database fails", function(){
        const userEmail: UserEmail = {
          type: "userEmail",
          email: "pz4@wp.pl" 
        };
       /* function expectedErr(){
            isAuth(req, res, () => {})
         } */
     
    })
})

