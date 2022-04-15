export interface IAlbumCreate {
  id: string;
  name: string;
  isHidden: boolean;
  images: IImageCreate[];
}

export interface IImageCreate {
  title: string;
  file: File;
}
