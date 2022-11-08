import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Izdelek } from './izdelek';
import { Trgovina } from './trgovina';
import { Vrsta } from './vrsta';

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

  public pridobiTrgovine(): Observable<Trgovina[]> {
    const url: string = `${this.apiUrl}/trgovine`;
    return this.http.get<Trgovina[]>(url).pipe(retry(1), catchError(this.napakaHandler));
  }

  public pridobiVrste(): Observable<Vrsta[]> {
    const url: string = `${this.apiUrl}/vrste`;
    return this.http.get<Vrsta[]>(url).pipe(retry(1), catchError(this.napakaHandler));
  }

  public dodajIzdelek(izdelek: Izdelek): Observable<Izdelek> {
    const url: string = `${this.apiUrl}/izdelki`;
    return this.http.post<Izdelek>(url, izdelek).pipe(retry(1), catchError(this.napakaHandler));
  }
  
  public dodajTrgovino(trgovina: Trgovina): Observable<Trgovina> {
    const url: string = `${this.apiUrl}/trgovine`;
    return this.http.post<Trgovina>(url, trgovina).pipe(retry(1), catchError(this.napakaHandler));
  }

  public dodajVrsto(vrsta: Vrsta): Observable<Vrsta> {
    const url: string = `${this.apiUrl}/vrste`;
    return this.http.post<Vrsta>(url, vrsta).pipe(retry(1), catchError(this.napakaHandler));
  }

  public urediIzdelek(izdelek: Izdelek): Observable<Izdelek> {
    const url: string = `${this.apiUrl}/izdelki/${izdelek.izdelek_id}`;
    return this.http.put<Izdelek>(url, izdelek).pipe(retry(1), catchError(this.napakaHandler));
  }

  public izbrisiIzdelek(izdelekID: number) {
    const url: string = `${this.apiUrl}/izdelki/${izdelekID}`;
    return this.http.delete(url, {observe: 'response'}).pipe(retry(1), catchError(this.napakaHandler));
  }

  public izbrisiTrgovino(trgovinaID: number) {
    const url: string = `${this.apiUrl}/trgovine/${trgovinaID}`;
    return this.http.delete(url, {observe: 'response'}).pipe(retry(1), catchError(this.napakaHandler));
  }

  public izbrisiVrsto(vrstaID: number) {
    const url: string = `${this.apiUrl}/vrste/${vrstaID}`;
    return this.http.delete(url, {observe: 'response'}).pipe(retry(1), catchError(this.napakaHandler));
  }

  private napakaHandler(napaka: HttpErrorResponse) {
    return throwError(() => napaka.statusText);
  }
}
