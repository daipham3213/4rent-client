import { UserView } from '../types';

export interface IPostBox {
  activeUser?: UserView;
  isShow?: boolean;
  onBackdropClick?: () => void;
}
