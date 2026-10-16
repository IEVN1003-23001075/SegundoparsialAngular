
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { IVenta } from '../venta';

@Component({
  selector: 'app-registro-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-ventas.html',
  styleUrl: './registro-ventas.css',
})
export class RegistroVentas implements OnInit {

  ventas: IVenta[] = [];

  // Datos del formulario de edición.
  nombre: string = '';
  compradores: number = 1;
  boletos: number = 1;
  tarjeta: string = 'no';

  precio: number = 12;
  total: number = 0;
  mensaje: string = '';

  // Control del formulario.
  mostrarFormulario: boolean = false;
  indiceEditar: number = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventasCinepolis');

    if (datos) {
      try {
        const registros: unknown = JSON.parse(datos);

        this.ventas = Array.isArray(registros)
          ? registros as IVenta[]
          : [];
      } catch {
        this.ventas = [];
      }
    } else {
      this.ventas = [];
    }
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem(
      'ventasCinepolis',
      JSON.stringify(this.ventas)
    );
  }

  editarVenta(i: number): void {
    if (i < 0 || i >= this.ventas.length) {
      return;
    }

    const venta = this.ventas[i];

    // Cargar los datos de la venta seleccionada.
    this.indiceEditar = i;
    this.nombre = venta.nombre;
    this.compradores = venta.compradores;
    this.boletos = venta.boletos;
    this.tarjeta = venta.tarjeta;
    this.total = venta.total;

    this.mensaje = '';
    this.mostrarFormulario = true;
  }

  actualizarVenta(): void {
    this.mensaje = '';

    if (this.indiceEditar < 0 ||
        this.indiceEditar >= this.ventas.length) {
      this.mensaje = 'Selecciona una venta válida.';
      return;
    }

    if (this.nombre.trim() === '') {
      this.mensaje = 'Escribe el nombre del comprador.';
      return;
    }

    if (
      !Number.isInteger(Number(this.compradores)) ||
      Number(this.compradores) <= 0
    ) {
      this.mensaje =
        'La cantidad de compradores debe ser un entero mayor a cero.';
      return;
    }

    if (
      !Number.isInteger(Number(this.boletos)) ||
      Number(this.boletos) <= 0
    ) {
      this.mensaje =
        'La cantidad de boletos debe ser un entero mayor a cero.';
      return;
    }

    // Cada comprador puede comprar hasta 7 boletos.
    const limite = Number(this.compradores) * 7;

    if (Number(this.boletos) > limite) {
      this.mensaje =
        'Entre todos pueden comprar hasta ' + limite + ' boletos.';
      return;
    }

    // Recalcular el total con los datos modificados.
    let nuevoTotal = Number(this.boletos) * this.precio;

    let porcentajePagar = 100;

    // De 3 a 5 boletos: descuento del 10 %.
    if (Number(this.boletos) >= 3) {
      porcentajePagar = 90;
    }

    // Más de 5 boletos: descuento del 15 %.
    if (Number(this.boletos) > 5) {
      porcentajePagar = 85;
    }

    nuevoTotal = nuevoTotal * porcentajePagar / 100;

    // Descuento adicional del 10 % con tarjeta Cineco.
    if (this.tarjeta === 'si') {
      nuevoTotal = nuevoTotal * 90 / 100;
    }

    const ventaActualizada: IVenta = {
      nombre: this.nombre.trim(),
      compradores: Number(this.compradores),
      boletos: Number(this.boletos),
      tarjeta: this.tarjeta,
      total: Number(nuevoTotal.toFixed(2))
    };

    // Reemplazar el registro existente.
    // No se agrega una venta nueva.
    this.ventas[this.indiceEditar] = ventaActualizada;

    this.guardarEnLocalStorage();

    this.cancelarEdicion();
    this.mensaje = 'Venta actualizada correctamente.';
  }

  cancelarEdicion(): void {
    this.mostrarFormulario = false;
    this.indiceEditar = -1;

    this.nombre = '';
    this.compradores = 1;
    this.boletos = 1;
    this.tarjeta = 'no';
    this.total = 0;
  }

  eliminarVenta(i: number): void {
    if (i < 0 || i >= this.ventas.length) {
      return;
    }

    this.ventas.splice(i, 1);

    this.guardarEnLocalStorage();

    // Si se elimina la venta que se estaba editando,
    // cerrar el formulario.
    if (this.indiceEditar === i) {
      this.cancelarEdicion();
    } else if (this.indiceEditar > i) {
      this.indiceEditar--;
    }
  }

  regresar(): void {
    this.router.navigate(['/escuela/cinepolis']);
  }
}
