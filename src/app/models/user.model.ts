// user.model.ts

export interface UserData {
  id?: number;
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}
