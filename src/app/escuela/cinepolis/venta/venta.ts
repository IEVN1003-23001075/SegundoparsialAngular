
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IVenta } from '../venta';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [],
  templateUrl: './venta.html',
  styleUrl: './venta.css'
})
export class Venta {

  @Input() ventas: IVenta[] = [];

  @Output() editarVentaEvent = new EventEmitter<number>();

  @Output() eliminarVentaEvent = new EventEmitter<number>();

}
