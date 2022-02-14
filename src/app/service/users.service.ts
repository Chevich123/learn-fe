import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from "../user/iuser";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getAll(token: string | undefined): Observable<IUser[]> {
    return this.http.get<IUser[]>(`http://localhost:3000/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  edit(token: string | undefined, user: IUser, userId: string | null){
    const url = `http://localhost:3000/users/${userId}`;
    return this.http.patch<String>(url, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
