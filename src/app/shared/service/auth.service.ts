import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthRequest, AuthResponse, RegisterRequest } from '../model/auth.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { getEmail, removeAccessToken, removeEmail } from '../utils/local-storage.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_ROOT: string = `${environment.apiRootUrl}/auth/`;

  private http = inject(HttpClient);
  private router = inject(Router);

  public login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.AUTH_ROOT + 'login', authRequest)
  }

  public register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    registerRequest.role = "USER";
    return this.http.post<AuthResponse>(this.AUTH_ROOT + 'register', registerRequest);
  }

  public lougout() {
    this.http.post(this.AUTH_ROOT + 'logout/' + getEmail(), {})
      .subscribe(() => {
        removeAccessToken();
        removeEmail();
        this.router.navigate(['login'])
      });
  }
}
