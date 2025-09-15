import { News } from '../database/models/news';
import { EStatus, type IDataResponse } from '../types/response';

async function getKqxsresultService(): Promise<IDataResponse> {
  try {
    const blog = await News.findOne();

    if (!blog) {
      const data: IDataResponse = {
        status: EStatus.ERROR,
        message: 'KqxsResult not found',
      };
      return data;
    }

    const data: IDataResponse = {
      status: EStatus.SUCCESS,
      data: blog,
    };
    return data;
  } catch (err) {
    const data: IDataResponse = {
      status: EStatus.ERROR,
      message: String(err),
    };
    return data;
  }
}

export { getKqxsresultService };
