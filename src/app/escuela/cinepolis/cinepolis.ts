import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cinepolis.html',
})
export class Cinepolis {

  nombre: string = '';
  compradores: number = 0;
  boletos: number = 0;
  tarjeta: string = 'no';

  precio: number = 12;
  total: number = 0;
  mensaje: string = '';
  mostrarResultado: boolean = false;

  procesar(): void {
    this.total = 0;
    this.mensaje = '';
    this.mostrarResultado = false;

    if (this.nombre.trim() === '') {
      this.mensaje = 'Escribe el nombre del comprador.';
    }
    else if (
      !(this.compradores > 0) ||
      this.compradores % 1 !== 0
    ) {
      this.mensaje = 'La cantidad de compradores debe ser un entero mayor a cero.';
    }
    else if (
      !(this.boletos > 0) ||
      this.boletos % 1 !== 0
    ) {
      this.mensaje = 'La cantidad de boletos debe ser un entero mayor a cero.';
    }
    else {
      let limite: number = 0;

      // Cada comprador permite comprar 7 boletos.
      for (let persona = 1; persona <= this.compradores; persona++) {
        limite = limite + 7;
      }

      if (this.boletos > limite) {
        this.mensaje = 'Entre todos pueden comprar hasta ' + limite + ' boletos.';
      }
      else {

        // Sumamos el precio de cada boleto.
        for (let boleto = 1; boleto <= this.boletos; boleto++) {
          this.total = this.total + this.precio;
        }

        let porcentajePagar: number = 100;

        // Desde 3 boletos se paga el 90 %.
        if (this.boletos >= 3) {
          porcentajePagar = 90;
        }

        // Si supera 5, cambiamos el porcentaje al 85 %.
        if (this.boletos > 5) {
          porcentajePagar = 85;
        }

        this.total = this.total * porcentajePagar / 100;

        // Cineco: se paga el 90 % del importe ya descontado.
        if (this.tarjeta === 'si') {
          this.total = this.total * 90 / 100;
        }

        this.mostrarResultado = true;
      }
    }
  }

  salir(): void {
    window.location.href = '/';
  }
}