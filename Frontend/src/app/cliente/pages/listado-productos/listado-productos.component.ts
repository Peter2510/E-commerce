import { Component } from '@angular/core';
import { Marca, Producto, UrlImage } from 'src/app/interfaces/producto.interface';
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
  marcas!: Marca[];

  constructor(private clienteServices: ClienteService){
    //this.obtenerProductos();
  }



  ngOnInit(){
    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerMarcas();
    console.log(this.products.length);
    
  }
  


  obtenerProductos() {
    this.clienteServices.listarProductos().subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.productos)) {
          this.products = response.productos as Producto[];
          console.log(this.products);

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

  obtenerMarcas(){
    this.clienteServices.getMarcas().subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.marcas)) {
          this.marcas = response.marcas as Marca[];
          this.marcas.forEach(element =>{
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

  mostrarProdMarcas(id: number){
    this.clienteServices.listarProductosMarca(id).subscribe({
      next: (response: any) => {
        if (response.ok && Array.isArray(response.productos)) {
          this.products = response.productos as Producto[];
          console.log('hola  marcas '+this.products.length)
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
