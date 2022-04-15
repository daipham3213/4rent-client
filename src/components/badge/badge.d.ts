import { BaseHTMLProps, IStatus } from '../components';

export interface IBadge extends IStatus, BaseHTMLProps<HTMLDivElement> {
  badgeContent?: number;
  max?: number;
  variant?: 'dot' | 'number';
  positionHorizontal?: 'left' | 'right';
  positionVertical?: 'top' | 'bottom';
  showZero?: boolean;
}
