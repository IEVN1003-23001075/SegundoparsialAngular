
import { Routes } from '@angular/router';

export const routes: Routes = [

  // FORMULARIOS
  {
    path: 'formulario/zodiaco',
    loadComponent: () =>
      import('./formulario/zodiaco/zodiaco')
        .then(c => c.Zodiaco)
  },

  {
    path: 'formulario/distancia',
    loadComponent: () =>
      import('./formulario/alumnos/alumnos')
        .then(c => c.Alumnos)
  },

  // CINÉPOLIS
  {
    path: 'escuela/cinepolis',
    loadComponent: () =>
      import('./escuela/cinepolis/cinepolis')
        .then(c => c.Cinepolis)
  },

  {
    path: 'escuela/ventas',
    loadComponent: () =>
      import('./escuela/cinepolis/registro-ventas/registro-ventas')
        .then(c => c.RegistroVentas)
  },

  // LISTA DE ESCUELA
  {
    path: 'escuela/listaescuela',
    loadComponent: () =>
      import('./escuela/lista-escuela/lista-escuela')
        .then(c => c.ListaEscuela)
  },

  // ABC ALUMNOS
  {
    path: 'utl/alumnos',
    loadComponent: () =>
      import('./utl/ABCAlumnos/alumnos/alumnos/alumnos')
        .then(c => c.Alumnos)
  },

  {
    path: 'utl/alumnos/agregar',
    loadComponent: () =>
      import('./utl/ABCAlumnos/agregar/agregar')
        .then(c => c.Agregar)
  },

  {
    path: 'utl/alumnos/editar/:matricula',
    loadComponent: () =>
      import('./utl/ABCAlumnos/editar/editar')
        .then(c => c.Editar)
  },

  {
    path: 'utl/alumnos/eliminar/:matricula',
    loadComponent: () =>
      import('./utl/ABCAlumnos/eliminar/eliminar')
        .then(c => c.Eliminar)
  },

  // ABC MAESTROS
  {
    path: 'utl/maestros',
    loadComponent: () =>
      import('./utl/ABCMaestros/maestros/maestros/maestros')
        .then(c => c.Maestros)
  },

  {
    path: 'utl/maestros/agregar',
    loadComponent: () =>
      import('./utl/ABCMaestros/agregar/agregar')
        .then(c => c.AgregarMaestro)
  },

  {
    path: 'utl/maestros/editar/:idmaestro',
    loadComponent: () =>
      import('./utl/ABCMaestros/editar/editar')
        .then(c => c.EditarMaestro)
  },

  {
    path: 'utl/maestros/eliminar/:idmaestro',
    loadComponent: () =>
      import('./utl/ABCMaestros/eliminar/eliminar')
        .then(c => c.EliminarMaestro)
  },

  // REDIRECCIONES ANTERIORES
  {
    path: 'formulario/alumnos',
    redirectTo: 'formulario/distancia',
    pathMatch: 'full'
  },

  {
    path: 'formulario/escuela',
    redirectTo: 'escuela/listaescuela',
    pathMatch: 'full'
  },

  // PÁGINA PRINCIPAL
  {
    path: '',
    redirectTo: 'escuela/listaescuela',
    pathMatch: 'full'
  },

  // RUTAS NO EXISTENTES
  {
    path: '**',
    redirectTo: 'escuela/listaescuela'
  }

];
