import { ISize } from '../components';

declare function Logo(props: ILogo): JSX.Element;

export interface ILogo extends ISize {
  showTitle?: boolean;
  uri?: string;
}
