import { CSSProperties } from 'react';

export interface ISkeleton {
  animation?: 'wave' | 'pulsate' | false;
  variant?: 'circular' | 'rectangular' | 'text' | string;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
}
