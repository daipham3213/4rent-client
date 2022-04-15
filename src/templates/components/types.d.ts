export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface UserView {
  id: string;
  fistName: string;
  username: string;
  lastName: string;
  avatar?: string;
}

export interface BaseProps {
  createdAt: Date;
  createdBy: UserView;
  remark?: string;
}

export interface UserDetail extends UserView {
  dob?: Date;
  idCard?: string;
  email: string;
  phoneNumber: string;
  isVerify?: boolean;
  isAdmin?: boolean;
}
