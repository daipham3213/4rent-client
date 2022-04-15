import React from 'react';

import { ISize, IStatus } from '../components';

export interface IInput
  extends ISize,
    IStatus,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {
  label?: string | number | JSX.Element;
  helperText?: string;
  isError?: boolean;
  accessory?: () => JSX.Element;
}
