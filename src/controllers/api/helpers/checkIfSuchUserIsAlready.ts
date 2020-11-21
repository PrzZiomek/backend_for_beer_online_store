import { fetchAllUsers } from "../../../models/users/fetchAllUsers";
import { User } from "../../../models/users/userInterface";
import { searchForUser } from "./searchForUser";
import { promiseWrapper } from "./promiseWrapper";


export const checkIfSuchUserIsAlready = (rows: User[], user: User) => {
   const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));  
   const userFound = usersFromDB.some(item => searchForUser(item, user));
 return userFound;   
}


