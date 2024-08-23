import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-litado-productos',
  templateUrl: './litado-productos.component.html',
  styleUrls: ['./litado-productos.component.css']
})
export class LitadoProductosComponent {
  products: Producto[] = [
    {
      id: 1,
      nombre: 'Product 1',
      descripcion: 'This is a great product.',
      precio: 19.99,
      idCategoria: 1,
      idMarca:1,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      nombre: 'Product 2',
      descripcion: 'This is a great product.',
      precio: 19.99,
      idCategoria: 1,
      idMarca:1,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      nombre: 'Product 3',
      descripcion: 'This is a great product.',
      precio: 19.99,
      idCategoria: 1,
      idMarca:1,
      imageUrl: 'https://via.placeholder.com/150'
    },
    // Agrega más productos según sea necesario
  ];


  obtenerProductos(){
    
  }

}
