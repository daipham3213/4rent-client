import React from 'react';

import { ILocation, BaseProps, UserView } from '../types';

export interface IPost extends BaseProps {
  contents: string;
  location: ILocation;
  price: number;
  floorArea: number;
  furnitureStatus: string;
  comments?: IComment[];
  key?: string | number;
  currentUser?: UserView;
}

export interface ICommentBox {
  message?: string;
  images?: string[];
  onMessageChange?: (e: React.FormEvent<HTMLSpanElement>) => void;
  onSendClick?: () => void;
  onAddImageClick?: () => void;
  currentUser?: UserView;
}

export interface IComment extends BaseProps {
  id: string;
  message?: string;
  replies?: IComment[];
  key?: string | number;
  currentUser?: UserView;
}
