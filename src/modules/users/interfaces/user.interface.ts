export interface User {
  email: string;
  password: string;
  verified?: boolean;
  deleted?: boolean;
  superAdmin?: boolean;
}
