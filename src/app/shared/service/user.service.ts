import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_ROOT: string = `${environment.apiRootUrl}/user/`;

  private http = inject(HttpClient);

  public getUser() {
    return this.http.get<User>(this.USER_ROOT + this.email);
  }

  public updateUser(user: User) {
    return this.http.put<User>(this.USER_ROOT + this.email, user);
  }

  private get email() {
    return localStorage.getItem('email');
  }
  
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
}