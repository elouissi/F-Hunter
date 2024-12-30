import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegistrationData {
  username: string;
  firstName: string;
  lastName: string;
  cin: string;
  nationality: string;
  licenseExpiration: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = 'https://localhost:8443/api/V2/auth';


  constructor(private http: HttpClient) {}

  register(data: RegistrationData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
