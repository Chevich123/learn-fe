export class IUser {
  username: string;
  password: string;
  userId?: string;
  constructor(username: string, password: string) {
    this.password = password;
    this.username = username;
  }
}

