import { User } from "../../../models/users/userInterface";


export const searchForUser = (item: any, user: User) =>{ 
    const { name, surname, email } = user;
    let userInDB = item as User;
      return (
         name === userInDB.name &&
         surname === userInDB.surname ||
         email === userInDB.email
     ) 
  }