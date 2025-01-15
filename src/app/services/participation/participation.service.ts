// participation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface ParticipationRequest {
  cin: string;
  competitionCode: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private apiUrl = 'https://localhost:8443/api/participation';

  constructor(private http: HttpClient) {}

  participate(participationData: ParticipationRequest): Observable<any> {
    console.log('participation data: ', participationData);
    return this.http.post(`${this.apiUrl}/participer`, participationData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 403) {
      errorMessage = 'You do not have permission to perform this action. Please check your authorization.';
    } else if (error.status === 400) {
      errorMessage = 'Invalid participation data. Please check your information.';
    }
    return throwError(() => errorMessage);
  }
}

