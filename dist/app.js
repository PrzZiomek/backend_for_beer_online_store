"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const MySQLStore = require('express-mysql-session')(express_session_1.default);
const adminRoutes_1 = require("./routes/adminRoutes");
const PORT = 8080;
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sklepinternetowy',
    database: 'beer_store_app_database',
    // Whether or not to automatically check for and clear expired sessions:
    //clearExpired: true,
    // Whether or not to create the sessions database table, if one does not already exist:
    //createDatabaseTable: true,
    //endConnectionOnClose: true,
    // charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
//var connection = mysql.createConnection(options); // or mysql.createPool(options);
//var sessionStore = new MySQLStore(options);
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_session_1.default({
    secret: "alternative secret string",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(options)
}));
app.use(adminRoutes_1.adminRoutes);
app.listen(PORT, () => {
    console.log('Server start!');
});
