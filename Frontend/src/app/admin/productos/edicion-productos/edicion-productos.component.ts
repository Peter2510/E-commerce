import { Component, inject, OnInit } from '@angular/core';
import { ServicioAdminService } from '../../services/servicio-admin.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosServicioService } from '../../services/productos-servicio.service';
import {
  categoria,
  Marca,
  Producto,
} from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-edicion-productos',
  templateUrl: './edicion-productos.component.html',
  styleUrls: ['./edicion-productos.component.css'],
})
export class EdicionProductosComponent implements OnInit {
  servicioMarcasCategorias = inject(ServicioAdminService);
  servicioProductos = inject(ProductosServicioService);

  public route = inject(ActivatedRoute);

  marcasTotales = this.servicioMarcasCategorias.marcas;
  categoriasTotales = this.servicioMarcasCategorias.categorias;
  productId!: number;
  producto!: Producto;

  categoria!: categoria;
  marca!: Marca;
  imagen!: File;

  guardarEdicion() {
    let nuevoProducto: Producto = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      categoria: this.categoria,
      marca: this.marca,
      url_imagenes: [],
      descripcion: this.producto.descripcion,
      minimoInventario: this.producto.minimoInventario,
    };

    this.servicioProductos
      .editarProducto(nuevoProducto, this.imagen)
      .subscribe();

    console.log(this.producto, nuevoProducto);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.servicioProductos
      .obtenerProductoId(this.productId)
      .subscribe((elemento: any) => {
        console.log(elemento);

        this.producto = elemento.producto;
      });
  }
}
