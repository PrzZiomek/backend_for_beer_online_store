"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllUsers = void 0;
const database_1 = require("../../util/database");
exports.fetchAllUsers = () => database_1.pool.execute('SELECT * FROM users');
