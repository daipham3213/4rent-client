import React from 'react';

import { ChildWithProps } from '../components';
import { IDivider } from '../divider/divider';

export interface ISidebar
  extends ISidebarContext,
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  topOffset?: string | number;
  leftOffset?: string | number;
  rightOffset?: string | number;
}

export interface ISidebarContext {
  isCollapsed?: boolean;
  isHidden?: boolean;
  variants?: 'minimal' | 'maximized' | 'hidden';
  onCollapseState?: (isCollapsed: boolean) => void;
  onHiddenState?: (isHidden: boolean) => void;
  position?: 'left' | 'right';
}
export interface ISidebarHeader
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode | ChildWithProps<ISidebarContext>;
}
export interface ISidebarBody
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode | ChildWithProps<ISidebarContext>;
  divider?: IDivider;
}
export interface ISidebarFooter
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode | ChildWithProps<ISidebarContext>;
  divider?: IDivider;
}
