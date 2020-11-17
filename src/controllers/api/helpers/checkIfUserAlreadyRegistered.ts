import { fetchAllUsers } from "../../../models/users/fetchAllUsers";
import { User } from "../../../models/users/userInterface";
import { searchForUser } from "./searchForUser";
import { wrapPromise } from "./wrapPromise";


export const checkIfUserAlreadyRegistered = (user: User, cb: Function) => {
   wrapPromise(fetchAllUsers, (res: any) => { 
        const rows = res[0] 
        const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));  
        const userFound = usersFromDB.some(item => searchForUser(item, user));         
     cb(userFound)         
   }) 
      
}




/*
export const checkIfUserAlreadyRegistered = (user: User, cb: Function) => {
    fetchAllUsers() 
      .then(res => { 
         const rows = res[0];
         const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));  
         const userFound = usersFromDB.some(item => searchForUser(item, user))
       cb(userFound)         
      })
      .catch(err => console.log(err))

}*/