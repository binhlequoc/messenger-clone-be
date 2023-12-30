export interface IUserDto {
  email: string;
  firstName: string;
  lastName: string;
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
