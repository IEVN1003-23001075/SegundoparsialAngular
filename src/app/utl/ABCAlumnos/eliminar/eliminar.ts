
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

    this.alumnosService.getAlumnos().subscribe({

      next: (response: AlumnosUtl[]) => {

        this.alumno = response.find(
          alumno => alumno.matricula.toString() === matricula
        );

        if (!this.alumno) {
          this.error = 'No se encontró el alumno.';
        }

        this.cargando = false;

      },

      error: (error) => {

        console.error('Error al consultar alumno:', error);

        this.error = 'No fue posible consultar el alumno.';
        this.cargando = false;

      }

    });

  }

  confirmarEliminar(): void {

    if (!this.alumno) {
      return;
    }

    this.eliminando = true;
    this.error = '';

    this.alumnosService.eliminarAlumno(
      this.alumno.matricula
    ).subscribe({

      next: () => {

        this.router.navigate(['/utl/alumnos']);

      },

      error: (error) => {

        console.error('Error al eliminar alumno:', error);

        this.error = 'No fue posible eliminar al alumno.';
        this.eliminando = false;

      }

    });

  }

  cancelar(): void {
    this.router.navigate(['/utl/alumnos']);
  }

}
