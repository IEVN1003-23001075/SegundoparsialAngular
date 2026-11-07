
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaestrosUTL } from '../maestrosUTL';
import { MaestroApiService } from '../maestroapi.service';

@Component({
  selector: 'app-agregar-maestro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class AgregarMaestro {

  maestro: MaestrosUTL = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  guardando = false;
  error = '';
  mensaje = '';

  constructor(
    private maestrosService: MaestroApiService,
    private router: Router
  ) {}

  agregarMaestro(formulario: NgForm): void {

    if (formulario.invalid || this.guardando) {
      this.error = 'Completa todos los campos correctamente.';
      return;
    }

    this.guardando = true;
    this.error = '';
    this.mensaje = '';

    this.maestrosService.agregarMaestro(this.maestro).subscribe({

      next: (response: any) => {

        if (response?.exito) {
          this.mensaje = 'Maestro registrado correctamente.';

          setTimeout(() => {
            this.router.navigate(['/utl/maestros']);
          }, 1000);

        } else {
          this.error = response?.mensaje ||
            'No fue posible registrar el maestro.';
          this.guardando = false;
        }

      },

      error: (error) => {

        console.error(error);

        this.error = error.error?.mensaje ||
          'Ocurrió un error al comunicarse con el servidor.';

        this.guardando = false;

      }

    });

  }

}
