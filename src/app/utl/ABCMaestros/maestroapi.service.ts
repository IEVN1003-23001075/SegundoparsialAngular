
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaestrosUTL } from './maestrosUTL';

@Injectable({
  providedIn: 'root'
})
export class MaestroApiService {

  private API_URL = 'http://127.0.0.1:5000/api/maestros/';

  constructor(private http: HttpClient) {}

  getMaestros(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  getMaestro(idmaestro: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}${idmaestro}`
    );
  }

  agregarMaestro(maestro: MaestrosUTL): Observable<any> {
    return this.http.post<any>(
      this.API_URL,
      maestro
    );
  }

  actualizarMaestro(
    idmaestro: number,
    maestro: MaestrosUTL
  ): Observable<any> {
    return this.http.put<any>(
      `${this.API_URL}${idmaestro}`,
      maestro
    );
  }

  eliminarMaestro(idmaestro: number): Observable<any> {
    return this.http.delete<any>(
      `${this.API_URL}${idmaestro}`
    );
  }

}
