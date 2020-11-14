import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

import { adminRoutes } from './routes/adminRoutes';

const PORT = 8080;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")))

app.use(adminRoutes)

app.listen(PORT, () => {
  console.log('Server start!');
});








