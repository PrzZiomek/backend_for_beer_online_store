import { fetchAllUsers } from "../../../models/users/fetchAllUsers";
import { User } from "../../../models/users/userInterface";
import { searchForUser } from "./searchForUser";
import { promiseWrapper } from "./promiseWrapper";


export const checkIfSuchUserAlreadyRegistered = (user: User, cb: Function) => {
   promiseWrapper(fetchAllUsers, (res: any) => { 
        const rows = res[0] 
        const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));  
        const userFound = usersFromDB.some(item => searchForUser(item, user));         
     cb(userFound)         
   }) 
      
}


