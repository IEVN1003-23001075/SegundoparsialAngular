
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AlumnosUtl } from '../../alumnosUTL';
import { ProyectoapiService } from '../../alumnoapi.service';
import { AlumnosFilterPipe } from '../../alumnos-filter.pipe';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AlumnosFilterPipe
  ],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos implements OnInit {

  // Filtro de búsqueda
  listFilter: string = '';

  // Arreglo de alumnos
  alumnos: AlumnosUtl[] = [];

  // Estado de carga
  cargando: boolean = false;

  // Mensaje de error
  error: string = '';

  constructor(
    private alumnosService: ProyectoapiService,
    private router: Router
  ) {}

  // Inicializar componente
  ngOnInit(): void {
    this.cargarAlumnos();
  }

  // ==========================================
  // CONSULTAR ALUMNOS
  // ==========================================

  cargarAlumnos(): void {

    this.cargando = true;
    this.error = '';

    this.alumnosService.getAlumnos().subscribe({

      next: (response: any) => {

        console.log('Respuesta de Flask:', response);

        // Verificar que la respuesta contenga un arreglo
        if (response && Array.isArray(response.alumnos)) {

          // Guardar únicamente el arreglo de alumnos
          this.alumnos = response.alumnos;

          console.log('Alumnos cargados:', this.alumnos);

        } else {

          // Si la respuesta no tiene el formato esperado
          this.alumnos = [];

          this.error = 'La respuesta del servidor no tiene el formato esperado.';

          console.error('Formato de respuesta incorrecto:', response);

        }

        this.cargando = false;

      },

      error: (error) => {

        console.error('Error al consultar alumnos:', error);

        this.alumnos = [];

        this.error = 'No fue posible cargar los alumnos.';

        this.cargando = false;

      }

    });

  }

  // ==========================================
  // EDITAR ALUMNO
  // ==========================================

  editarAlumno(alumno: AlumnosUtl): void {

    this.router.navigate([
      '/utl/alumnos/editar',
      alumno.matricula
    ]);

  }

  // ==========================================
  // ELIMINAR ALUMNO
  // ==========================================

  eliminarAlumno(matricula: string): void {

    this.router.navigate([
      '/utl/alumnos/eliminar',
      matricula
    ]);

  }

}
