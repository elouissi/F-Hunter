import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';

interface RegistrationData {
  username: string;
  firstName: string;
  lastName: string;
  cin: string;
  nationality: string;
  licenseExpirationDate: Date;
  email: string;
  password: string;
}
export interface RegisterResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = 'https://localhost:8443/api/V2/auth';


  constructor(private http: HttpClient) {}

  register(data: RegistrationData): Observable<any> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, data).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', response.token);
        }
      })
    );
  }
}
