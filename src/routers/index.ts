import { type Request, type Response } from 'express';
import { Express } from 'express-serve-static-core';
import news from './news';

const routers = (app: Express): void => {
  app.use('/api/news', news);

  app.get('/', (_req: Request, res: Response) => {
    res.send(`
    <h1>Server: ON</h1>
    <h2>Path not found</h2>
  `);
  });
};

export default routers;
