
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

  // Consultar alumnos
  getAlumnos(): Observable<AlumnosUtl[]> {
    return this.http.get<AlumnosUtl[]>(this.apiUrl);
  }

  // Agregar alumno
  agregarNuevoAlumno(datos: AlumnosUtl): Observable<any> {
    return this.http.post<any>(this.apiUrl, datos);
  }

  // Editar alumno
  actualizarAlumno(
    matricula: string,
    datos: AlumnosUtl
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${encodeURIComponent(matricula)}`,
      datos
    );
  }

  // Eliminar alumno
  eliminarAlumno(matricula: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${encodeURIComponent(matricula)}`
    );
  }
}
