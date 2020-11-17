"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = void 0;
const database_1 = require("../../util/database");
exports.saveUser = ({ name, surname, email, password }) => database_1.pool.execute('INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)', [name, surname, email, password]);
