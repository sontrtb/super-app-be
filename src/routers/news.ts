import { Router } from 'express';
import {
  getNewsCaregoryController,
  getNewsNewController,
} from '../controllers/news-controller';

const news = Router();

news.get('/new', getNewsNewController);
news.get('/category', getNewsCaregoryController);

export default news;
