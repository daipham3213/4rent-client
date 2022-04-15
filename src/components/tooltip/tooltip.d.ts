import { BaseHTMLProps } from '../components';

export interface ITooltip extends BaseHTMLProps<HTMLDivElement> {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  message: string | JSX.Element;
}
