import React from 'react';

import { IVariant } from '../components';

export interface IFab extends IVariant {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tooltip?: string | JSX.Element;
}
