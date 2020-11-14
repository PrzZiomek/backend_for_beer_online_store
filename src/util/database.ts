import mysql from 'mysql2';


  export const pool = mysql.createPool({
            host: "localhost",
            user: "root",
            database: "beer_store_app_database",
            password: "sklepinternetowy"
        }).promise();