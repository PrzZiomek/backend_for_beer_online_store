import { pool as db } from '../../util/database';



export const fetchAllUsers = ()  => db.execute('SELECT * FROM users');
