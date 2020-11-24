import { pool as db } from '../../util/database';
import { searchForUser } from './searchForUser';
import { UserInterface } from './interfaces/user';
import { UserClass } from './interfaces/userClass';


export const User: UserClass = class {

    static async fetchAllUsers(): Promise<UserInterface[]>{
        const resDB = await db.execute('SELECT * FROM users');        
      return resDB[0] as UserInterface[];
    }

    static async findUser(user: UserInterface): Promise<UserInterface | undefined>{
        const rows = await this.fetchAllUsers().catch(err => console.log(`req to database: ${err}`));
        if(!rows) return;
        const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));  
        const userFound = usersFromDB.find(item => searchForUser(item, user)) as UserInterface;
      return userFound;   
    }

    static saveUser({ name, surname, email, password }: UserInterface): void{
        db.execute(
        'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
        [ name, surname, email, password ]
        )
    }
}


 