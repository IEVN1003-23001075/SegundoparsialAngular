
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'formulario/zodiaco',
    loadComponent: () =>
      import('./formulario/zodiaco/zodiaco').then(
        (c) => c.Zodiaco
      ),
  },
  {
    path: 'formulario/distancia',
    loadComponent: () =>
      import('./formulario/alumnos/alumnos').then(
        (c) => c.Alumnos
      ),
  },
  {
    path: 'escuela/cinepolis',
    loadComponent: () =>
      import('./escuela/cinepolis/cinepolis').then(
        (c) => c.Cinepolis
      ),
  },
  {
    path: 'escuela/ventas',
    loadComponent: () =>
      import('./escuela/cinepolis/registro-ventas/registro-ventas').then(
        (c) => c.RegistroVentas
      ),
  },
  {
    path: 'escuela/listaescuela',
    loadComponent: () =>
      import('./escuela/lista-escuela/lista-escuela').then(
        (c) => c.ListaEscuela
      ),
  },

  // Direcciones anteriores.
  {
    path: 'formulario/alumnos',
    redirectTo: 'formulario/distancia',
    pathMatch: 'full',
  },
  {
    path: 'formulario/escuela',
    redirectTo: 'escuela/listaescuela',
    pathMatch: 'full',
  },

  // Página principal.
  {
    path: '',
    redirectTo: 'escuela/listaescuela',
    pathMatch: 'full',
  },

  // Direcciones no existentes.
  {
    path: '**',
    redirectTo: 'escuela/listaescuela',
  },
];
  