import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';



export interface LoginResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:8443/api/V2/auth/authentication';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const data = { email, password };

    return this.http.post<LoginResponse>(`${this.baseUrl}`, data).pipe(
      // Save the token to localStorage when login is successful
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', response.token); // Store the token
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser'); // Remove the token from localStorage
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser'); // Check if token exists in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('currentUser'); // Retrieve the token from localStorage
  }
}
