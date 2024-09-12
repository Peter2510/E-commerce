import { Component, inject } from '@angular/core';
import { ProductosServicioService } from '../../services/productos-servicio.service';
import { ServicioAdminService } from '../../services/servicio-admin.service';
import {
  categoria,
  Marca,
  Producto,
  UrlImage,
} from 'src/app/interfaces/producto.interface';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-creacion-productos',
  templateUrl: './creacion-productos.component.html',
  styleUrls: ['./creacion-productos.component.css'],
})
export class CreacionProductosComponent {
  //servicio
  servicioProducto = inject(ProductosServicioService);
  servicioMarcasCategorias = inject(ServicioAdminService);
  marcasTotales = this.servicioMarcasCategorias.marcas;
  categoriasTotales = this.servicioMarcasCategorias.categorias;
  //elementos que sirven para informacion
  nombre!: string;
  categoria!: categoria;
  marca!: Marca;
  imagen: File[] = [];
  descripcion!: string;
  minimoInventario!: number;
  precio!: number;

  cantidadInventario!: number;

  ingresoInventario: boolean = false;

  cambioInventario(value: string) {
    if (value == 'si') {
      this.ingresoInventario = true;
    } else if (value == 'no') {
      this.ingresoInventario = false;
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.imagen = Array.from(files);
  }

  creacionProductos() {
    //verificar que todos los campos estan completos
    if (!this.nombre || !this.precio || !this.categoria || !this.marca || !this.descripcion || !this.minimoInventario) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de guardar el producto.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return; // Detener la ejecución si hay campos incompletos
    }
  
    //rear el objeto del nuevo producto
    let nuevoProducto: Producto = {
      nombre: this.nombre,
      precio: this.precio,
      categoria: this.categoria,
      marca: this.marca,
      url_imagenes: [],
      descripcion: this.descripcion,
      minimoInventario: this.minimoInventario,
    };
  
    //llamar al servicio para crear el producto
    if (this.ingresoInventario) {
      this.servicioProducto
        .creacionProducto(nuevoProducto, this.imagen, this.cantidadInventario)
        .subscribe({
          next: (r_success) => {
            Swal.fire({
              title: 'Producto creado',
              text: 'El producto ha sido creado con éxito y agregado al inventario',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al crear el producto',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        });
    } else {
      this.servicioProducto
        .creacionProducto(nuevoProducto, this.imagen, 0)
        .subscribe({
          next: (r_success) => {
            Swal.fire({
              title: 'Producto creado',
              text: 'El producto ha sido creado con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al crear el producto',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        });
    }
  }
  
  
}
