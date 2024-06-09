export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  cart?: [];
  orders?: [];
}

export interface IUserRegistrationFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  id: string;
}

export interface IUserLoginCredentials {
  username: string;
  password: string;
}

export interface IUserLoginFormData {
  id: string;
  username: string;
  password: string;
}
