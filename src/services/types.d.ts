export interface IApiError {
  error?: string;
}

export interface IResponse<ResponseType> extends IApiError {
  status: number;
  data?: ResponseType;
}

export interface IPageable<T> {
  content: T[];
  pageable: {
    sort: ISort;
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  number: number;
  sort: ISort;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface ISort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
