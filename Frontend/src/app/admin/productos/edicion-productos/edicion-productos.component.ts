import { Component, inject, OnInit } from '@angular/core';
import { ServicioAdminService } from '../../services/servicio-admin.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosServicioService } from '../../services/productos-servicio.service';
import {
  categoria,
  Marca,
  Producto,
  UrlImage,
} from 'src/app/interfaces/producto.interface';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edicion-productos',
  templateUrl: './edicion-productos.component.html',
  styleUrls: ['./edicion-productos.component.css'],
})
export class EdicionProductosComponent implements OnInit {
  servicioMarcasCategorias = inject(ServicioAdminService);
  servicioProductos = inject(ProductosServicioService);
  idMarca!: number;
  idCategoria!: number;
  public route = inject(ActivatedRoute);

  marcasTotales = this.servicioMarcasCategorias.marcas;
  categoriasTotales = this.servicioMarcasCategorias.categorias;
  productId!: number;
  producto!: Producto;

  categoria!: categoria;
  marca!: Marca;
  imagen!: File;
  imagenesEliminar: UrlImage[] = [];
  nombresImagenesEliminar: string[] = [];

  guardarEdicion() {
    let nuevoProducto = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      idCategoria: this.idCategoria,
      idMarca: this.idMarca,
      url_imagenes: [],
      descripcion: this.producto.descripcion,
      minimoInventario: this.producto.minimoInventario,
    };

    console.log("nuevo ",nuevoProducto);
    this.servicioProductos
      .editarProducto(nuevoProducto, this.imagen, this.nombresImagenesEliminar)
      .subscribe({
        next: (data:any) => {         
            Swal.fire({
              title: 'Producto editado',
              text: 'El producto se ha editado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            }
          );
        },error: (error:HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: error.error.mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      });

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  eliminarImagenes(nombreImagen: UrlImage | undefined) {
    if (nombreImagen !== undefined && nombreImagen?.nombre !== undefined) {
      console.log(nombreImagen);

      this.imagenesEliminar.push(nombreImagen);
      this.nombresImagenesEliminar.push(nombreImagen.nombre);
      this.producto.url_imagenes = this.producto.url_imagenes.filter(
        (valores) => valores.nombre !== nombreImagen.nombre
      );
      console.log(this.producto.url_imagenes);
    }
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.servicioProductos
      .obtenerProductoId(this.productId)
      .subscribe((elemento: any) => {
        console.log(elemento);
        this.producto = elemento.producto;
        this.idCategoria = elemento.idCategoria;
        this.idMarca = elemento.idMarca;
        console.log(this.idCategoria)
      });
  }
}
