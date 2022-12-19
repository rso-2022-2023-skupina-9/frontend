import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CenaKosarice } from './cena-kosarice';
import { Izdelek } from './izdelek';
import { Kosarica } from './kosarica';

@Injectable({
  providedIn: 'root'
})
export class StoritevZaKosariceService {

  constructor(private http: HttpClient) { }

  private mikrostoritevZaKosariceUrl = environment.mikrostoritevZaKosariceUrl;

  public pridobiKosarice(): Observable<Kosarica[]> {
    const url: string = `${this.mikrostoritevZaKosariceUrl}/kosarice`;
    return this.http.get<Kosarica[]>(url).pipe(retry(1), catchError(this.napakaHandler));
  }

  public pridobiKosarico(id: number): Observable<Kosarica> {
    const url: string = `${this.mikrostoritevZaKosariceUrl}/kosarice/${id}`;
    return this.http.get<Kosarica>(url).pipe(retry(1), catchError(this.napakaHandler));
  }

  public dodajKosarico(kosarica: Kosarica): Observable<Kosarica> {
    const url: string = `${this.mikrostoritevZaKosariceUrl}/kosarice`;
    return this.http.post<Kosarica>(url, kosarica).pipe(retry(1), catchError(this.napakaHandler));
  }

  public urediKosarico(kosarica: Kosarica): Observable<Kosarica> {
    const url: string = `${this.mikrostoritevZaKosariceUrl}/kosarice/${kosarica.kosarica_id}`;
    return this.http.put<Kosarica>(url, kosarica).pipe(retry(1), catchError(this.napakaHandler));
  }

  public izbrisiKosarico(id: number) {
    const url: string = `${this.mikrostoritevZaKosariceUrl}/kosarice/${id}`;
    return this.http.delete(url, {observe: 'response'}).pipe(retry(1), catchError(this.napakaHandler));
  }

  public dodajIzdelekVKosarico(kosaricaID: number, izdelek: Izdelek): Observable<Kosarica> {
    const url: string = `${this.mikrostoritevZaKosariceUrl}/kosarice/${kosaricaID}/izdelki`;
    return this.http.post<Kosarica>(url, izdelek).pipe(retry(1), catchError(this.napakaHandler));
  }

  public odstraniIzdelekIzKosarice(kosaricaID: number, izdelekID: number): Observable<Kosarica> {
    const url: string = `${this.mikrostoritevZaKosariceUrl}/kosarice/${kosaricaID}/izdelki/${izdelekID}`;
    return this.http.delete<Kosarica>(url).pipe(retry(1), catchError(this.napakaHandler));
  }

  public calculateCenaKosarica(kosaricaID: number): Observable<CenaKosarice> {
    const url: string = `${this.mikrostoritevZaKosariceUrl}/kosarice/${kosaricaID}/cena`;
    return this.http.get<CenaKosarice>(url).pipe(retry(1), catchError(this.napakaHandler));
  }
  
  private napakaHandler(napaka: HttpErrorResponse) {
    return throwError(() => napaka.statusText);
  }
}
