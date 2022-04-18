import React from 'react';

import { ChildWithProps, BaseHTMLProps } from '../components';

export interface IImageGrid
  extends BaseHTMLProps<HTMLDivElement>,
    Omit<IGridContext, 'activeIndex' | 'activeItem'> {
  children?: React.ReactNode | ChildWithProps<IIndicator>;
}

export interface IGridContext {
  media: IMedia[];
  onMediaClick?: (position: number) => void;
  onActiveChange?: (index: number) => void;
  activeItem: IMedia;
  activeIndex: number;
}

export interface IMedia {
  src: string;
  alt?: string;
  isVideo?: boolean;
}

export interface IIndicator {
  media: IMedia[];
  renderItem?: (item: IMedia, active: boolean) => JSX.Element;
  maxDots?: number;
}
