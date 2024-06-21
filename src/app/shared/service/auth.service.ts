import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthRequest, AuthResponse, RegisterRequest } from '../model/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_ROOT: string = `${environment.apiRootUrl}/auth/`;

  private http = inject(HttpClient);

  public login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.AUTH_ROOT + 'login', authRequest)
  }

  public register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    registerRequest.role = "USER";
    return this.http.post<AuthResponse>(this.AUTH_ROOT + 'register', registerRequest);
  }
}
