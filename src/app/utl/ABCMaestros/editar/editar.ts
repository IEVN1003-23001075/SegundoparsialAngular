
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaestrosUTL } from '../maestrosUTL';
import { MaestroApiService } from '../maestroapi.service';

@Component({
  selector: 'app-editar-maestro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class EditarMaestro implements OnInit {

  idmaestro = 0;

  maestro: MaestrosUTL = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  cargando = false;
  guardando = false;
  error = '';
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private maestrosService: MaestroApiService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('idmaestro')
    );

    if (!id || isNaN(id)) {
      this.error = 'El ID del maestro no es válido.';
      return;
    }

    this.idmaestro = id;
    this.cargarMaestro();

  }

  cargarMaestro(): void {

    this.cargando = true;
    this.error = '';

    this.maestrosService.getMaestro(this.idmaestro).subscribe({

      next: (response: any) => {

        const datos = response?.maestro;

        if (!response?.exito || !datos) {
          this.error = response?.mensaje ||
            'No se encontró el maestro.';
          this.cargando = false;
          return;
        }

        this.maestro = {
          idmaestro: datos.idmaestro,
          nombre: datos.nombre,
          apaterno: datos.apaterno,
          amaterno: datos.amaterno,
          correo: datos.correo
        };

        this.cargando = false;

      },

      error: (error) => {

        console.error(error);

        this.error = error.error?.mensaje ||
          'No fue posible cargar los datos del maestro.';

        this.cargando = false;

      }

    });

  }

  actualizarMaestro(formulario: NgForm): void {

    if (formulario.invalid || this.guardando) {
      this.error = 'Completa todos los campos correctamente.';
      return;
    }

    this.guardando = true;
    this.error = '';
    this.mensaje = '';

    this.maestrosService.actualizarMaestro(
      this.idmaestro,
      this.maestro
    ).subscribe({

      next: (response: any) => {

        if (response?.exito) {

          this.mensaje = 'Maestro actualizado correctamente.';

          setTimeout(() => {
            this.router.navigate(['/utl/maestros']);
          }, 1000);

        } else {

          this.error = response?.mensaje ||
            'No fue posible actualizar el maestro.';

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

  cancelar(): void {
    this.router.navigate(['/utl/maestros']);
  }

}
