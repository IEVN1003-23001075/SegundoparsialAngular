
import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUTL } from './maestrosUTL';

@Pipe({
  name: 'maestrosFilter',
  standalone: true
})
export class MaestrosFilterPipe implements PipeTransform {

  transform(
    maestros: MaestrosUTL[] | null,
    filtro: string
  ): MaestrosUTL[] {

    if (!maestros) {
      return [];
    }

    if (!filtro || filtro.trim() === '') {
      return maestros;
    }

    const busqueda = filtro.trim().toLowerCase();

    return maestros.filter(maestro => {

      const id = String(maestro.idmaestro ?? '');

      const nombre = String(maestro.nombre ?? '').toLowerCase();

      const apaterno = String(maestro.apaterno ?? '').toLowerCase();

      const amaterno = String(maestro.amaterno ?? '').toLowerCase();

      const correo = String(maestro.correo ?? '').toLowerCase();

      return (
        id.includes(busqueda) ||
        nombre.includes(busqueda) ||
        apaterno.includes(busqueda) ||
        amaterno.includes(busqueda) ||
        correo.includes(busqueda)
      );

    });

  }

}
