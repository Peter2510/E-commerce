import { Component, inject } from '@angular/core';
import { ProductosServicioService } from '../../services/productos-servicio.service';
import { ServicioAdminService } from '../../services/servicio-admin.service';
import {
  categoria,
  Marca,
  Producto,
  UrlImage,
} from 'src/app/interfaces/producto.interface';

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
  imagen!: File;
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
    const file: File = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  creacionProductos() {
    let nuevoProducto: Producto = {
      nombre: this.nombre,
      precio: this.precio,
      categoria: this.categoria,
      marca: this.marca,
      url_imagenes: [],
      descripcion: this.descripcion,
      minimoInventario: this.minimoInventario,
    };

    this.servicioProducto
      .creacionProducto(nuevoProducto, this.imagen)
      .subscribe();

    this.nombre = '';
    this.precio = 0;
    this.descripcion = '';
    this.minimoInventario = 1;
  }
}
