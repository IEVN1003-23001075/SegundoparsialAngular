
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { IVenta } from './venta';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css',
})
export class Cinepolis implements OnInit {

  nombre: string = '';
  compradores: number = 0;
  boletos: number = 0;
  tarjeta: string = 'no';

  precio: number = 12;
  total: number = 0;
  mensaje: string = '';

  mostrarResultado: boolean = false;
  ventas: IVenta[] = [];

  indiceEditar: number = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarVentas();

    // Comprobar si se solicitó editar una venta
    // desde la pantalla del historial.
    const indiceGuardado = localStorage.getItem(
      'ventaEditarIndice'
    );

    if (indiceGuardado !== null) {
      const indice = Number(indiceGuardado);

      localStorage.removeItem('ventaEditarIndice');

      if (
        Number.isInteger(indice) &&
        indice >= 0 &&
        indice < this.ventas.length
      ) {
        this.editarVenta(indice);
      }
    }
  }

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
      this.mensaje =
        'La cantidad de compradores debe ser un entero mayor a cero.';
    }
    else if (
      !(this.boletos > 0) ||
      this.boletos % 1 !== 0
    ) {
      this.mensaje =
        'La cantidad de boletos debe ser un entero mayor a cero.';
    }
    else {
      let limite: number = 0;

      // Cada comprador puede comprar hasta 7 boletos.
      for (
        let persona = 1;
        persona <= this.compradores;
        persona++
      ) {
        limite = limite + 7;
      }

      if (this.boletos > limite) {
        this.mensaje =
          'Entre todos pueden comprar hasta ' + limite + ' boletos.';
      }
      else {
        // Calcular el precio de todos los boletos.
        for (
          let boleto = 1;
          boleto <= this.boletos;
          boleto++
        ) {
          this.total = this.total + this.precio;
        }

        let porcentajePagar: number = 100;

        // De 3 a 5 boletos: descuento del 10 %.
        if (this.boletos >= 3) {
          porcentajePagar = 90;
        }

        // Más de 5 boletos: descuento del 15 %.
        if (this.boletos > 5) {
          porcentajePagar = 85;
        }

        this.total =
          this.total * porcentajePagar / 100;

        // Descuento adicional del 10 % con tarjeta Cineco.
        if (this.tarjeta === 'si') {
          this.total = this.total * 90 / 100;
        }

        this.mostrarResultado = true;

        if (this.indiceEditar === -1) {
          this.mensaje =
            'Venta registrada correctamente.';
        }
        else {
          this.mensaje =
            'Venta actualizada correctamente.';
        }

        this.registrarVenta();
      }
    }
  }

  registrarVenta(): void {
    const nuevaVenta: IVenta = {
      nombre: this.nombre.trim(),
      compradores: this.compradores,
      boletos: this.boletos,
      tarjeta: this.tarjeta,
      total: this.total
    };

    if (this.indiceEditar === -1) {
      this.ventas.push(nuevaVenta);
    }
    else {
      this.ventas[this.indiceEditar] = nuevaVenta;
      this.indiceEditar = -1;
    }

    this.guardarVentas();
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventasCinepolis');

    if (datos) {
      try {
        this.ventas = JSON.parse(datos) as IVenta[];

        if (!Array.isArray(this.ventas)) {
          this.ventas = [];
        }
      }
      catch {
        this.ventas = [];
      }
    }
    else {
      this.ventas = [];
    }
  }

  guardarVentas(): void {
    localStorage.setItem(
      'ventasCinepolis',
      JSON.stringify(this.ventas)
    );
  }

  verVentas(): void {
    this.guardarVentas();
    this.router.navigate(['/escuela/ventas']);
  }

  editarVenta(i: number): void {
    if (i < 0 || i >= this.ventas.length) {
      return;
    }

    this.indiceEditar = i;

    this.nombre = this.ventas[i].nombre;
    this.compradores = this.ventas[i].compradores;
    this.boletos = this.ventas[i].boletos;
    this.tarjeta = this.ventas[i].tarjeta;

    this.total = 0;
    this.mostrarResultado = false;

    this.mensaje =
      'Modifica los datos y pulsa Guardar cambios.';
  }

  salir(): void {
    this.router.navigate(['/']);
  }
}
