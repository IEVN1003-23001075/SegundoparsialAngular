
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MaestrosUTL } from '../../maestrosUTL';
import { MaestroApiService } from '../../maestroapi.service';
import { MaestrosFilterPipe } from '../../maestros-filter.pipe';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MaestrosFilterPipe
  ],
  templateUrl: './maestros.html',
  styleUrl: './maestros.css'
})
export class Maestros implements OnInit {

  // Filtro de búsqueda
  listFilter: string = '';

  // Arreglo de maestros
  maestros: MaestrosUTL[] = [];

  // Estado de carga
  cargando: boolean = false;

  // Mensaje de error
  error: string = '';

  constructor(
    private maestrosService: MaestroApiService,
    private router: Router
  ) {}

  // Inicializar componente
  ngOnInit(): void {
    this.cargarMaestros();
  }

  // ==========================================
  // CONSULTAR MAESTROS
  // ==========================================

  cargarMaestros(): void {

    this.cargando = true;
    this.error = '';

    this.maestrosService.getMaestros().subscribe({

      next: (response: any) => {

        console.log('Respuesta de Flask:', response);

        if (
          response &&
          Array.isArray(response.maestros)
        ) {

          this.maestros = response.maestros;

          console.log('Maestros cargados:', this.maestros);

        } else {

          this.maestros = [];

          this.error = 'La respuesta del servidor no tiene el formato esperado.';

          console.error('Formato de respuesta incorrecto:', response);

        }

        this.cargando = false;

      },

      error: (error) => {

        console.error('Error al consultar maestros:', error);

        this.maestros = [];

        this.error = 'No fue posible cargar los maestros.';

        this.cargando = false;

      }

    });

  }

  // ==========================================
  // EDITAR MAESTRO
  // ==========================================

  editarMaestro(maestro: MaestrosUTL): void {

    if (maestro.idmaestro === undefined) {
      return;
    }

    this.router.navigate([
      '/utl/maestros/editar',
      maestro.idmaestro
    ]);

  }

  // ==========================================
  // ELIMINAR MAESTRO
  // ==========================================

  eliminarMaestro(idmaestro: number): void {

    this.router.navigate([
      '/utl/maestros/eliminar',
      idmaestro
    ]);

  }

}
