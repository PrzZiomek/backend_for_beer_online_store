import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

import { adminRoutes } from './routes/admin';
import { options } from './util/sessionStoreOptions';
import { apiRoutes } from './routes/api/main';


const PORT = 8080;

const app = express();
const MySQLStore = require('express-mysql-session')(session);
//const server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "some secret string",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(options)
}));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(adminRoutes);
app.use(apiRoutes);


app.listen(PORT, () => {
  console.log('Server start!');
});








