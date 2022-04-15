import { IStatus, Range } from '../components';

export interface IProgress extends IStatus {
  progress: Range<0, 101>;
  buffer?: number;
  showNumber?: boolean;
}
