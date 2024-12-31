import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {jwtDecode, JwtPayload} from "jwt-decode";



export interface LoginResponse {
  token: string;
}
export interface CustomJwtPayload extends JwtPayload {
  username?: string;
  role?: string;
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
  getUserFromToken(): JwtPayload | null {
    const token = localStorage.getItem('currentUser'); // Récupérer le token du localStorage
    if (!token) {
      return null;
    }

    try {
      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
      return decodedToken; // Retourne les informations décodées
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  getUsername(): string | null {
    const token = localStorage.getItem('currentUser');
    if (!token) {
      console.log("le token not found");
      return null;
    }

    try {
      const decodedToken: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
      console.log(decodedToken.username);
      return decodedToken.username || null; // Retourne le champ "username" ou null
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser'); // Check if token exists in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('currentUser'); // Retrieve the token from localStorage
  }
}
