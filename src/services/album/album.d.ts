export interface IAlbumCreate {
  name: string;
  isHidden: boolean;
  images: IImageCreate[];
}

export interface IImageCreate {
  title: string;
  file: File;
}
