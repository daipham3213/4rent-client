import { IAlbumCreate } from '../album/album';

export interface IPostCreate {
  id: string;
  content: string;
  latitude: number;
  longitude: number;
  price: number;
  floorArea: number;
  address: string;
  furnitureStatus: string;
  album: IAlbumCreate;
}

export interface IPostFilter {}
