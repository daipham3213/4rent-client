import React from 'react';

import { ChildWithProps, BaseHTMLProps } from '../components';

export interface IImageGrid extends BaseHTMLProps<HTMLDivElement> {
  media: IMedia[];
  onMediaClick?: (position: number) => void;
  children?: React.ReactNode | ChildWithProps<IIndicator>;
}

export interface IMedia {
  src: string;
  alt?: string;
  isVideo?: boolean;
}

export interface IIndicator {
  media: IMedia[];
  activeItem?: IMedia;
  activeIndex?: number;
  renderItem?: (item: IMedia, active: boolean) => JSX.Element;
  onActiveChange?: (index: number) => void;
  maxDots?: number;
}
