import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Specie {
  id:string;
  name: string;
  SpeciesType: string;
  Difficulty: string;
  speciesType: string;
  minimumWeight: number;
  points: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpecieService {
  private apiUrl = 'https://localhost:8443/api/specie/getAll';
  private createUrl = 'https://localhost:8443/api/specie/save';
  private deleteUrl = 'https://localhost:8443/api/specie/delete';


  constructor(private http: HttpClient) {}

  getSpecies(): Observable<Specie[]> {
    return this.http.get<Specie[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addSpecie(data: Specie): Observable<string> {
    return this.http.post<string>(this.createUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteSpecie(name: string): Observable<string> {
    return this.http.get<string>(`${this.deleteUrl}/${name}`).pipe(
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
