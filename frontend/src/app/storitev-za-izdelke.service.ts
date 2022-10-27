import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Izdelek } from './izdelek';

@Injectable({
  providedIn: 'root'
})
export class StoritevZaIzdelkeService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  public pridobiIzdelke(): Observable<Izdelek[]> {
    const url: string = `${this.apiUrl}/izdelki`;
    return this.http.get<Izdelek[]>(url).pipe(retry(1), catchError(this.napakaHandler));
  }

  private napakaHandler(napaka: HttpErrorResponse) {
    return throwError(() => napaka.statusText);
  }
}
