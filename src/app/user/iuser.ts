export class IUser {
  username: string;
  password: string;
  userId: string | undefined;
  constructor(username: string, password: string) {
    this.password = password;
    this.username = username;
  }
}

