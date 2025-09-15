export enum EStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IDataResponse<T = unknown> {
  status: EStatus;
  errorCode?: string;
  message?: string;
  data?: T;
}

export interface IDataResponseWidthPage<T = unknown> {
  status: EStatus;
  errorCode?: string;
  message?: string;
  data?: IRecords<T[]>;
}

export interface IRecords<T = unknown> {
  records: T;
  page: number;
  pageSize: number;
  total: number;
}
