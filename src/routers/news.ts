import { Router } from 'express';
import { getNewsNewController } from '../controllers/news-controller';

const news = Router();

news.get('/new', getNewsNewController);

export default news;
