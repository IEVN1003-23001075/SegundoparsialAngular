
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlumnosUtl } from './alumnosUTL';

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {

  private apiUrl = 'http://127.0.0.1:5000/api/alumnos';

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAlumno(matricula: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${encodeURIComponent(matricula)}`
    );
  }

  agregarNuevoAlumno(datos: AlumnosUtl): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      datos
    );
  }

  actualizarAlumno(
    matricula: string,
    datos: AlumnosUtl
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${encodeURIComponent(matricula)}`,
      datos
    );
  }

  eliminarAlumno(matricula: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${encodeURIComponent(matricula)}`
    );
  }

}
