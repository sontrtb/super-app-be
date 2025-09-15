import { type Request, type Response } from 'express';
import { EStatus, type IDataResponse } from '../types/response';
import { fetchNews } from '../crawler/news';
// import { getKqxsresultService } from '../services/news-services';

async function getNewsNewController(
  req: Request<unknown, unknown, unknown>,
  res: Response<IDataResponse>,
) {
  const response = await fetchNews(
    'https://vnexpress.net/rss/tin-moi-nhat.rss',
  );

  if (response?.status === EStatus.ERROR) {
    res.status(400).json(response);
    return;
  }
  res.status(200).json(response);
}

export { getNewsNewController };
