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
const admin_1 = require("./routes/admin");
const sessionStoreOptions_1 = require("./util/sessionStoreOptions");
const main_1 = require("./routes/api/main");
const PORT = 8080;
const app = express_1.default();
const MySQLStore = require('express-mysql-session')(express_session_1.default);
//const server = require('http').Server(app);
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_session_1.default({
    secret: "some secret string",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(sessionStoreOptions_1.options)
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(admin_1.adminRoutes);
app.use(main_1.apiRoutes);
app.use((error, req, res, next) => {
    // res.status(error.httpStatusCode)
    res.send(`<h1>Error: ${error.httpStatusCode}</h1>`);
});
app.listen(PORT, () => {
    console.log('Server start!');
});
