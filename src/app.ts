import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

import { adminRoutes } from './routes/adminRoutes';
import { options } from './util/sessionStoreOptions';
import { apiRoutes } from './routes/apiRoutes';


const PORT = 8080;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")))
app.use(session({
  secret: "some secret string",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(options)
}))

app.use(adminRoutes)
app.use(apiRoutes)

app.listen(PORT, () => {
  console.log('Server start!');
});








