
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosUtl } from '../alumnosUTL';
import { ProyectoapiService } from '../alumnoapi.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar implements OnInit {

  alumno: AlumnosUtl = {
    matricula: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  matriculaOriginal: string = '';
  cargando: boolean = true;
  guardando: boolean = false;
  error: string = '';

  constructor(
    private alumnosService: ProyectoapiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.matriculaOriginal =
      this.route.snapshot.paramMap.get('matricula') || '';

    if (!this.matriculaOriginal) {
      this.error = 'No se recibió la matrícula del alumno.';
      this.cargando = false;
      return;
    }

    this.cargarAlumno();
  }

  cargarAlumno(): void {
    this.cargando = true;
    this.error = '';

    this.alumnosService.getAlumno(this.matriculaOriginal).subscribe({

      next: (response: any) => {
        const encontrado = response?.alumno;

        if (response?.exito && encontrado) {
          this.alumno = { ...encontrado };
        } else {
          this.error = response?.mensaje || 'No se encontró el alumno.';
        }

        this.cargando = false;
      },

      error: (error) => {
        console.error(error);
        this.error = error.error?.mensaje ||
          'No fue posible cargar la información del alumno.';
        this.cargando = false;
      }

    });
  }

  actualizarAlumno(): void {
    this.error = '';

    if (
      !this.alumno.nombre.trim() ||
      !this.alumno.apaterno.trim() ||
      !this.alumno.amaterno.trim() ||
      !this.alumno.correo.trim()
    ) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    this.guardando = true;

    this.alumnosService.actualizarAlumno(
      this.matriculaOriginal,
      this.alumno
    ).subscribe({

      next: (response: any) => {
        if (response?.exito) {
          this.router.navigate(['/utl/alumnos']);
        } else {
          this.error = response?.mensaje ||
            'No fue posible actualizar al alumno.';
          this.guardando = false;
        }
      },

      error: (error) => {
        console.error(error);
        this.error = error.error?.mensaje ||
          'No fue posible actualizar al alumno.';
        this.guardando = false;
      }

    });
  }

  cancelar(): void {
    this.router.navigate(['/utl/alumnos']);
  }

}
