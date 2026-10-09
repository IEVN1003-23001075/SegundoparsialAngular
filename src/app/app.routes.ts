import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'formulario',
    children: [
      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./formulario/zodiaco/zodiaco').then(
            (c) => c.Zodiaco
          ),
      },
      {
        path: 'escuela',
        loadComponent: () =>
          import('./escuela/lista-escuela/lista-escuela').then(
            (c) => c.ListaEscuela
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'formulario/escuela',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'formulario/escuela',
  },
];