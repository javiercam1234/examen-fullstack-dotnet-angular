import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from './auth/login/interfaces/login.interface';
import { LoginSuccess } from './auth/login/interfaces/login-success.interface';
import { LoginError } from './auth/login/interfaces/login-error.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(body: Login): Observable<LoginSuccess | LoginError> {
    return this.http.post<LoginSuccess | LoginError>(
      `${environment.apiUrl}/login`,
      body
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
