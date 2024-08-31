import { Component } from '@angular/core';
import { Producto, UrlImage } from 'src/app/interfaces/producto.interface';
import { ClienteService } from '../../services/cliente.service';
import { categoria } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent {
  products: Producto[] = [];
  categorias!: categoria[];

  constructor(private clienteServices: ClienteService){
    this.obtenerProductos();
  }

  ngOnInit(){
    this.obtenerProductos();
    this.obtenerCategorias();
    console.log(this.products.length);
    
  }
  /*products: Producto[] = [
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
  ];*/


  obtenerProductos() {
    this.clienteServices.listarProductos().subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.productos)) {
          this.products = response.productos as Producto[];
        } else {
          console.error("Estructura inesperada en la respuesta:", response);
        }
      },
      error: (error) => {
        console.error("Error al obtener productos:", error);
      }
    });
  }
  obtenerCategorias(){
    this.clienteServices.getCategorias().subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.categorias)) {
          this.categorias = response.categorias as categoria[];
          this.categorias.forEach(element =>{
            console.log(element)
          })
        } else {
          console.error("Estructura inesperada en la respuesta:", response);
        }
      },
      error: (error) => {
        console.error("Error al obtener productos:", error);
      }
    });

  }


  

}
