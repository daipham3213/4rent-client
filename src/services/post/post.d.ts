import { IUserInfo } from '@/services/authentication/authentication';

import { IAlbumCreate } from '../album/album';

export interface IPostCreate {
  contents: string;
  latitude: number;
  longitude: number;
  price: number;
  floorArea: number;
  address: string;
  furnitureStatus: string;
  album?: IAlbumCreate;
}

export interface IPostView extends IPostCreate {
  id: string;
  createdAt: number;
  createdBy: IUserInfo;
  documentId: string;
  sumComment: number;
}

export interface IPostFilter {
  size?: number;
  floorArea?: number;
  minPrice?: number;
  maxPrice?: number;
  distance?: number;
  latitude?: number;
  longitude?: number;
}
