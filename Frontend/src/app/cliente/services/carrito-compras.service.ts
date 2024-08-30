import { Injectable } from '@angular/core';
import { CarritoCompras, ItemCarrito } from 'src/app/interfaces/cliente.interface';
import { Producto } from 'src/app/interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  carrito: CarritoCompras;

  constructor() {
    // Recupera el carrito desde localStorage o inicialízalo si no existe
    const carritoGuardado = localStorage.getItem('miCarrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : { itemsCarrito: [] }; // Asegúrate de que este sea el formato correcto para tu `CarritoCompras`
  }

  private guardarCarrito() {
    localStorage.setItem('miCarrito', JSON.stringify(this.carrito));
  }

  agregarItem(producto: Producto, cantidad: number): void {
    // Asegúrate de que itemsCarrito esté inicializado
    if (!this.carrito.itemsCarrito) {
      this.carrito.itemsCarrito = [];
    }

    // Verifica si el producto ya está en el carrito
    const itemExistente = this.carrito.itemsCarrito.find(item => item.producto?.id === producto.id);
    if (itemExistente) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      itemExistente.cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, agrégalo
      const itemCarrito = new ItemCarrito(producto, cantidad);
      this.carrito.itemsCarrito.push(itemCarrito);
    }

    // Guarda el carrito en localStorage
    this.guardarCarrito();
  }

  existeEnCarrito(producto: Producto): boolean{
    if (!this.carrito.itemsCarrito) {
      this.carrito.itemsCarrito = [];
    }
    const itemExistente = this.carrito.itemsCarrito.find(item => item.producto?.id === producto.id);
    if (itemExistente) {
      return true;
    } else {
      return false
    }

  }

  getCarrito(): CarritoCompras {
    return this.carrito;
  }

  getCantidadItems():number{
    return this.carrito.itemsCarrito!.length
  }

  eliminarItem(productoId: number): void {
    // Filtra el carrito para eliminar el ítem con el id especificado
    this.carrito.itemsCarrito = this.carrito.itemsCarrito!.filter(item => item.producto!.id !== productoId);
    this.guardarCarrito();
  }
}
