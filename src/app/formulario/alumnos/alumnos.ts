import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alumnos.html',
})
export class Alumnos {

  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    checkAdult: new FormControl(false, [
      Validators.requiredTrue
    ]),

    department: new FormControl(''),

    comment: new FormControl('', [
      Validators.required
    ])
  });

  enviar(): void {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.valid) {
      console.log('Datos del formulario:', this.contactForm.value);
    }
  }
}