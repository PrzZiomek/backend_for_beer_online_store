import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import SSE from 'express-sse-ts';
import { adminRoutes } from './routes/admin';
import { options } from './util/sessionStoreOptions';
import { apiRoutes } from './routes/api';
//import { userAlreadyExistResponse} from './controllers/resToClient/resToClient';


const PORT = 8080;

const app = express();
const MySQLStore = require('express-mysql-session')(session);
//const server = require('http').Server(app);

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


const sse = new SSE();

app.get('/events', sse.init);

setInterval(() => {
  sse.send(`Istnieje juz konto z takimi danymi`);
}, 1000);



app.listen(PORT, () => {
  console.log('Server start!');
});








