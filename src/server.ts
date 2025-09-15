import dotenv from 'dotenv';
dotenv.config();

import { fetchNews } from './crawler/news';

import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import routers from './routers';
// import { db } from './config/database.connection';

const port = process.env.PORT;

const app = express();
const httpServer = createServer(app);

// db.connect();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routers(app);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

fetchNews('https://vnexpress.net/rss/tin-moi-nhat.rss');
