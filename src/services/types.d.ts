export interface IApiError {
  error?: string;
}

export interface IResponse<ResponseType> extends IApiError {
  status: number;
  data?: ResponseType;
}
