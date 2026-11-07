
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaestrosUTL } from '../maestrosUTL';
import { MaestroApiService } from '../maestroapi.service';

@Component({
  selector: 'app-eliminar-maestro',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar.html',
  styleUrl: './eliminar.css'
})
export class EliminarMaestro implements OnInit {

  idmaestro = 0;
  maestro: MaestrosUTL | null = null;

  cargando = false;
  eliminando = false;
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

        this.maestro = datos;
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

  confirmarEliminacion(): void {

    if (!this.maestro || this.eliminando) {
      return;
    }

    const confirmar = window.confirm(
      `¿Estás seguro de eliminar al maestro ${this.maestro.nombre} ${this.maestro.apaterno}?`
    );

    if (!confirmar) {
      return;
    }

    this.eliminando = true;
    this.error = '';
    this.mensaje = '';

    this.maestrosService.eliminarMaestro(
      this.idmaestro
    ).subscribe({

      next: (response: any) => {

        if (response?.exito) {

          this.mensaje = 'Maestro eliminado correctamente.';

          setTimeout(() => {
            this.router.navigate(['/utl/maestros']);
          }, 1000);

        } else {

          this.error = response?.mensaje ||
            'No fue posible eliminar el maestro.';

          this.eliminando = false;

        }

      },

      error: (error) => {

        console.error(error);

        this.error = error.error?.mensaje ||
          'Ocurrió un error al comunicarse con el servidor.';

        this.eliminando = false;

      }

    });

  }

  cancelar(): void {
    this.router.navigate(['/utl/maestros']);
  }

}
