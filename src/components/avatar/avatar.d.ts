import { BaseHTMLProps } from '@/components/components';

export interface IAvatar extends BaseHTMLProps<HTMLDivElement> {
  src?: string;
  color?: string;
  alt?: string;
  variant?: 'rounded' | 'circle' | 'square';
  size?: 'tiny' | 'small' | 'large' | 'default';
}
