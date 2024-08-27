import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/interfaces/cliente.interface';

@Component({
  selector: 'app-carrito-de-compras',
  templateUrl: './carrito-de-compras.component.html',
  styleUrls: ['./carrito-de-compras.component.css']
})
export class CarritoDeComprasComponent implements OnInit {
  cartItems: Carrito[] = [
    {
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
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  getTotal(event: any): number {
    console.log('hola que hace')
    return this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }
}