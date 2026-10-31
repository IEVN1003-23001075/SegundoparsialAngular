
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AlumnosUtl } from '../alumnosUTL';
import { ProyectoapiService } from '../alumnoapi.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class Agregar {

  alumno: AlumnosUtl = {
    matricula: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  mensaje: string = '';
  error: string = '';
  guardando: boolean = false;

  constructor(
    private alumnosService: ProyectoapiService,
    private router: Router
  ) {}

  agregarAlumno(): void {

    this.mensaje = '';
    this.error = '';

    if (
      !this.alumno.matricula.trim() ||
      !this.alumno.nombre.trim() ||
      !this.alumno.apaterno.trim() ||
      !this.alumno.amaterno.trim() ||
      !this.alumno.correo.trim()
    ) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    this.guardando = true;

    this.alumnosService.agregarNuevoAlumno(this.alumno).subscribe({

      next: () => {

        this.mensaje = 'Alumno registrado correctamente.';
        this.guardando = false;

        this.router.navigate(['/utl/alumnos']);

      },

      error: (error) => {

        console.error('Error al agregar alumno:', error);

        this.error = 'No fue posible registrar al alumno.';
        this.guardando = false;

      }

    });

  }

  cancelar(): void {
    this.router.navigate(['/utl/alumnos']);
  }

}
