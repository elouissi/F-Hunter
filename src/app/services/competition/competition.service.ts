import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Competition {
  id:string;
  code: string;
  location: string;
  date: Date;
  speciesType: string;
  minParticipants: number;
  maxParticipants: number;
  openRegistration: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private apiUrl = 'https://localhost:8443/api/competition/getAll';
  private createUrl = 'https://localhost:8443/api/competition/save';
  private deleteUrl = 'https://localhost:8443/api/competition/remove';


  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addCompetition(data: Competition): Observable<string> {
    return this.http.post<string>(this.createUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteCompetition(code: string): Observable<string> {
    return this.http.get<string>(`${this.deleteUrl}/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 403) {
      errorMessage = 'You do not have permission to perform this action. Please check your authorization.';
    }

    return throwError(() => errorMessage);
  }
}
