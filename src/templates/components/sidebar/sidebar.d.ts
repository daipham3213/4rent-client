import React from 'react';

import { IUserInfo } from '@/services/authentication/authentication';

export interface ISidebar {
  items: ISidebarItem[];
  activeUser?: IUserInfo;
}
export interface ISidebarItem
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  description?: string;
  icon: (active?: boolean) => JSX.Element;
  active?: boolean;
}
