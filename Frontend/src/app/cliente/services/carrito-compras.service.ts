import { Injectable } from '@angular/core';
import { CarritoCompras, ItemCarrito } from 'src/app/interfaces/cliente.interface';
import { Producto } from 'src/app/interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  carrito!: CarritoCompras;

  constructor() { }
  agregarItem(producto: Producto, cantidad: number): void {
    const itemCarrito = new ItemCarrito(producto, cantidad);
    this.carrito.itemsCarrito?.push(itemCarrito)

  }

  getCarrito(){
    const carr= localStorage.getItem("miCarrito");
    this.carrito =carr ? JSON.parse(carr): null
    return this.carrito;

  }
}
