import { pool as db } from '../../util/database';
import { searchForUser, compareUserEmail } from './searchForUser';
import { UserInterface, UserOrEmail } from './interfaces/user';
import { UserClassInterface } from './interfaces/userClass';


export const User: UserClassInterface = class {

    static async fetchAllUsers(): Promise<UserInterface[]>{
        const resDB = await db.execute('SELECT * FROM users');        
      return resDB[0] as UserInterface[];
    }

    static async findUser(user: UserOrEmail ): Promise<UserOrEmail | undefined>{
        const rows = await this.fetchAllUsers().catch(err => console.log(`req to database: ${err}`));
        if(!rows) return;
        const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows))); 
        if(user.type === "userEmail"){
           const userFound = usersFromDB.find(item => compareUserEmail(item, user)) as UserOrEmail; 
         return userFound;
        }
        if(user.type === "userInterface"){
           const userFound = usersFromDB.find(item => searchForUser(item, user)) as UserOrEmail;
         return userFound;
        }      
    }

    static saveUser({ name, surname, email, password }: UserInterface): void{
        db.execute(
          'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
          [ name, surname, email, password ]
        )
    }
}


 