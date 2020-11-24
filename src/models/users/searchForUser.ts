import { UserInterface } from "./interfaces/user";


export const searchForUser = (item: any, user: UserInterface) =>{ 
    const { name, surname, email } = user;
    let userInDB = item as UserInterface;
      return (
         name === userInDB.name &&
         surname === userInDB.surname ||
         email === userInDB.email
     ) 
  }