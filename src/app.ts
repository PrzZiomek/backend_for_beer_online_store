import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

import { adminRoutes } from './routes/admin';
import { apiRoutes } from './routes/api/main';
import { ExtendedError } from './controllers/errors/extendedErrorClass';


const PORT = 8080;

const app = express();
const MySQLStore = require('express-mysql-session')(session);
//const server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));


app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(adminRoutes);
app.use(apiRoutes);

/*
app.use((error: ExtendedError, req: Request, res: Response, next: NextFunction) => {
 // res.status(error.httpStatusCode)

})
*/

app.listen(PORT, () => {
  console.log('Server start!');
});








