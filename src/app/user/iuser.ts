export class IUser {
  username: string;
  password: string;
  userId?: string;
  email?: string;
  phone?: string;
  site?: string;
  passwordRepeat: string = "";

  constructor(username: string, password: string) {
    this.password = password;
    this.username = username;
  }
}

