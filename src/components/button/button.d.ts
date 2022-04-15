import React from 'react';

import { ISize, IStatus, IVariant } from '../components';

export interface IButton
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    ISize,
    IStatus,
    IVariant {
  fullWidth?: boolean;
}
