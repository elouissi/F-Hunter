import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  cin: string;
  email: string;
  nationality: string;
  joinDate: Date;
  licenseExpirationDate: Date;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:8443/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(page: number = 0, size: number = 10): Observable<PageResponse<User>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<User>>(this.apiUrl, { params });
  }
}
