
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosUtl } from '../alumnosUTL';
import { ProyectoapiService } from '../alumnoapi.service';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.html',
  styleUrl: './eliminar.css'
})
export class Eliminar implements OnInit {

  alumno?: AlumnosUtl;
  cargando: boolean = true;
  eliminando: boolean = false;
  error: string = '';

  constructor(
    private alumnosService: ProyectoapiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const matricula =
      this.route.snapshot.paramMap.get('matricula');

    if (!matricula) {
      this.error = 'No se recibió la matrícula.';
      this.cargando = false;
      return;
    }

    this.cargarAlumno(matricula);
  }

  cargarAlumno(matricula: string): void {
    this.cargando = true;
    this.error = '';

    this.alumnosService.getAlumno(matricula).subscribe({

      next: (response: any) => {
        if (response?.exito && response?.alumno) {
          this.alumno = response.alumno;
        } else {
          this.error = response?.mensaje ||
            'No se encontró el alumno.';
        }

        this.cargando = false;
      },

      error: (error) => {
        console.error(error);
        this.error = error.error?.mensaje ||
          'No fue posible consultar el alumno.';
        this.cargando = false;
      }

    });
  }

  confirmarEliminar(): void {
    if (!this.alumno || this.eliminando) {
      return;
    }

    this.eliminando = true;
    this.error = '';

    this.alumnosService.eliminarAlumno(
      this.alumno.matricula
    ).subscribe({

      next: (response: any) => {
        if (response?.exito) {
          this.router.navigate(['/utl/alumnos']);
        } else {
          this.error = response?.mensaje ||
            'No fue posible eliminar al alumno.';
          this.eliminando = false;
        }
      },

      error: (error) => {
        console.error(error);
        this.error = error.error?.mensaje ||
          'No fue posible eliminar al alumno.';
        this.eliminando = false;
      }

    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/alumnos']);
  }

}
