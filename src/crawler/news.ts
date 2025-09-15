import Parser from 'rss-parser';
import axios from 'axios';
import { EStatus, IDataResponse } from '../types/response';

const parser = new Parser({
  timeout: 10000,
});

export interface INewsResApi {
  title: string;
  link: string;
  pubDate: Date;
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string;
  enclosure: {
    type: string;
    length: string;
    url: string;
  };
}

const fetchNews = async (feedUrl: string): Promise<IDataResponse> => {
  try {
    const response = await axios.get(feedUrl, {
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const contentType = response.headers['content-type'] || '';
    if (
      !contentType.includes('xml') &&
      !contentType.includes('rss')
    ) {
      console.warn(
        'Warning: Content-Type is not XML/RSS:',
        contentType,
      );
    }

    const rawContent = response.data;

    const feed = await parser.parseString(rawContent);

    return {
      status: EStatus.SUCCESS,
      data: feed.items,
    };
  } catch (error) {
    console.error('❌ Error fetching RSS feed:', error);
    return {
      status: EStatus.ERROR,
      message: String(error),
    };
  }
};

export { fetchNews };
