import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { IAlumno } from '../alumno';

@Component({
  selector: 'app-lista-escuela',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './lista-escuela.html',
})
export class ListaEscuela implements OnInit {

  formulario!: FormGroup;

  mostrarAlumno: boolean = false;

  alumnos: IAlumno[] = [];

  indiceEditar: number = -1;

  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      materia: new FormControl('', Validators.required)
    });

    this.cargarAlumnos();
  }

  muestraAlumno(): void {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    this.nuevoAlumno = {
      matricula: this.formulario.value.matricula,
      nombre: this.formulario.value.nombre,
      correo: this.formulario.value.correo,
      materia: this.formulario.value.materia
    };

    this.agregarAlumno();

    this.formulario.reset({
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    });
  }

  agregarAlumno(): void {
    if (this.indiceEditar === -1) {
      this.alumnos.push({ ...this.nuevoAlumno });
    }
    else {
      this.alumnos[this.indiceEditar] = { ...this.nuevoAlumno };
      this.indiceEditar = -1;
    }

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );
  }

  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
    else {
      this.alumnos = [];
    }
  }

  mostrarAlumnos(): void {
    this.cargarAlumnos();
    this.mostrarAlumno = true;
  }

  editarAlumno(i: number): void {
    this.indiceEditar = i;

    this.formulario.setValue({
      matricula: this.alumnos[i].matricula,
      nombre: this.alumnos[i].nombre,
      correo: this.alumnos[i].correo,
      materia: this.alumnos[i].materia
    });
  }

  eliminarAlumno(i: number): void {
    this.alumnos.splice(i, 1);

    if (this.indiceEditar === i) {
      this.indiceEditar = -1;

      this.formulario.reset({
        matricula: '',
        nombre: '',
        correo: '',
        materia: ''
      });
    }
    else if (this.indiceEditar > i) {
      this.indiceEditar = this.indiceEditar - 1;
    }

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );
  }
}