import React from 'react';

import { ISize } from '../components';

export interface IDivider extends ISize {
  variants?: 'middle' | 'start' | 'end';
  fontWeight?: 'normal' | 'bold';
  label?: string;
  textStyle?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
  lineStyle?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}
