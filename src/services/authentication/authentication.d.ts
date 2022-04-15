export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  email: string;
  phone: string;
}

export interface IVerifyOTP {
  otp: int;
}

export interface ICreateAccount extends IGender, IVerifyOTP {
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
  idCard: string;
}

export interface IGender {
  gender: 'male' | 'female' | 'other' | string;
}

export interface IToken {
  token: string;
}

export interface IUserInfo extends IGender {
  firstName: string;
  lastName: string;
  dob: Date;
  idCard: string;
  username: string;
  email: string;
  phone: string;
  id: string;
  avatar: string;
}
