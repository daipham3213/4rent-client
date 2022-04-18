import { IAlbumCreate } from '../album/album';
import { IUserInfo } from '@/services/authentication/authentication';

export interface IPostCreate {
  id: string;
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
