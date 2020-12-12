"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = require("../../util/database");
const searchForUser_1 = require("./searchForUser");
exports.User = class {
    static async fetchAllUsers() {
        const resDB = await database_1.pool.execute('SELECT * FROM users');
        return resDB[0];
    }
    static async findUser(user) {
        const rows = await this.fetchAllUsers().catch(err => console.log(`req to database: ${err}`));
        if (!rows)
            return;
        const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));
        if (user.type === "userEmail") {
            const userFound = usersFromDB.find(item => searchForUser_1.compareUserEmail(item, user));
            console.log(userFound);
            return userFound;
        }
        if (user.type === "userInterface") {
            const userFound = usersFromDB.find(item => searchForUser_1.searchForUser(item, user));
            return userFound;
        }
    }
    static saveUser({ name, surname, email, password }) {
        database_1.pool.execute('INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)', [name, surname, email, password]);
    }
};
