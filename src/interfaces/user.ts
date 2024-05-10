export interface IUserSignUp {
  email: string;
  fullName: string;
  age: number;
  password: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
}

export interface IUserFilter {
  email?: string;
  fullName?: string;
  page?: number;
}
