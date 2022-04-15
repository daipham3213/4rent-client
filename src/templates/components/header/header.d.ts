import React from 'react';

export interface IHeader {
  isDark?: boolean;
  visible?: boolean;
  onChangeTheme: (isDark: boolean) => void;
}

export interface ISearch
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  keywords?: string;
  onKeywordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onActive?: () => void;
  active?: boolean;
}
