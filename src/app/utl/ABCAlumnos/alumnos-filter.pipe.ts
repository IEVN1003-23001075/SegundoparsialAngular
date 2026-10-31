
import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUtl } from './alumnosUTL';

@Pipe({
  name: 'alumnosFilter',
  standalone: true
})
export class AlumnosFilterPipe implements PipeTransform {

  transform(
    alumnos: AlumnosUtl[],
    filtro: string
  ): AlumnosUtl[] {

    // Verificar que existan alumnos
    if (!alumnos || !Array.isArray(alumnos)) {
      return [];
    }

    // Si el filtro está vacío, mostrar todos
    if (!filtro || filtro.trim() === '') {
      return alumnos;
    }

    // Convertir el filtro a minúsculas
    const busqueda = String(filtro).toLowerCase().trim();

    // Filtrar alumnos
    return alumnos.filter(alumno => {

      const matricula = String(alumno.matricula ?? '').toLowerCase();
      const nombre = String(alumno.nombre ?? '').toLowerCase();
      const apaterno = String(alumno.apaterno ?? '').toLowerCase();
      const amaterno = String(alumno.amaterno ?? '').toLowerCase();
      const correo = String(alumno.correo ?? '').toLowerCase();

      return (
        matricula.includes(busqueda) ||
        nombre.includes(busqueda) ||
        apaterno.includes(busqueda) ||
        amaterno.includes(busqueda) ||
        correo.includes(busqueda)
      );

    });

  }

}
