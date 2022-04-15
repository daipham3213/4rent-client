import { ISize, IStatus } from '../components';

export interface ISwitch extends ISize, IStatus {
  checked: boolean;
  onChecked: (checked: boolean) => void;
  accessory?: () => JSX.Element;
}
