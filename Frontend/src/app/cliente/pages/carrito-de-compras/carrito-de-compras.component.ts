import { Component, OnInit } from '@angular/core';
import { Carrito, CarritoCompras, ItemCarrito } from 'src/app/interfaces/cliente.interface';
import { CarritoComprasService } from '../../services/carrito-compras.service';

@Component({
  selector: 'app-carrito-de-compras',
  templateUrl: './carrito-de-compras.component.html',
  styleUrls: ['./carrito-de-compras.component.css']
})
export class CarritoDeComprasComponent implements OnInit {
  carrito!: CarritoCompras;
  total: number =0;
  cartItems: ItemCarrito[] = [
    /*{
      nombre: 'Producto 1',
      descripcion: 'Este es el primer producto.',
      precio: 50.00,
      cantidad: 1,
      imagenUrl: 'https://via.placeholder.com/150'
    },
    {
      nombre: 'Producto 2',
      descripcion: 'Este es el segundo producto.',
      precio: 100.00,
      cantidad: 1,
      imagenUrl: 'https://via.placeholder.com/150'
    }*/
  ];

  constructor(private carritoCompras: CarritoComprasService) {
    this.carrito=this.carritoCompras.getCarrito();
    this.cartItems = this.carrito.itemsCarrito!; 
   }

  ngOnInit(): void {
    this.getTotal(Event);

   }

  getTotal(event: any): number {
    console.log('hola que hace')

    this.total= this.cartItems.reduce((total, item) => 
      total + ((item.producto?.precio ?? 0) * item.cantidad), 
      0);
    return this.total;
  }

  removeItem(productoId: number): void {
    this.carritoCompras.eliminarItem(productoId);
    this.carrito = this.carritoCompras.getCarrito();
    this.cartItems = this.carrito.itemsCarrito || []; // Actualiza la lista de ítems
    this.getTotal(Event); // Recalcula el total
  }
}