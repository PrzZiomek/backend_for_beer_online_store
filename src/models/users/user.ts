import { pool as db } from '../../util/database';
import { User } from './userInterface';



export const fetchAllUsers = ()  => db.execute('SELECT * FROM users');

export const saveUser = ({ name, surname, email, password }: User) => db.execute(
    'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
    [ name, surname, email, password ]
    )