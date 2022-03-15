import { SafeUrl } from '@angular/platform-browser';

export class IUser {
  username: string;
  password: string;
  userId?: string;
  email?: string;
  phone?: string;
  site?: string;
  avatar?: string;
  imagePreview?: SafeUrl;
  constructor(username: string, password: string) {
    this.password = password;
    this.username = username;
  }
}

