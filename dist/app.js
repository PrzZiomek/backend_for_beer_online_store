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
const express_sse_ts_1 = __importDefault(require("express-sse-ts"));
const admin_1 = require("./routes/admin");
const sessionStoreOptions_1 = require("./util/sessionStoreOptions");
const api_1 = require("./routes/api");
//import { userAlreadyExistResponse} from './controllers/resToClient/resToClient';
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
app.use(admin_1.adminRoutes);
app.use(api_1.apiRoutes);
const sse = new express_sse_ts_1.default();
app.get('/events', sse.init);
setInterval(() => {
    sse.send(`Istnieje juz konto z takimi danymi`);
}, 1000);
app.listen(PORT, () => {
    console.log('Server start!');
});
