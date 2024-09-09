import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Producto, UrlImage } from 'src/app/interfaces/producto.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductosServicioService {
  readonly directiva = 'productos';

  //signals
  public productos = signal<Producto[]>([]);

  constructor(private http: HttpClient) {
    this.ObtenerProductos();
  }

  ObtenerProductos() {
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/productos/`, {
        withCredentials: true,
      })
      .pipe(
        tap((valores: any) => {
          console.log(valores, valores.productos),
            this.productos.set(valores.productos);
        })
      )
      .subscribe();
  }

  creacionProducto(producto: Producto, imagen: File) {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());
    formData.append('descripcion', producto.descripcion);
    formData.append('minimoInventario', producto.minimoInventario.toString());
    formData.append('idCategoria', producto.categoria?.id?.toString() || '');

    formData.append('idMarca', producto.marca?.id?.toString() || '');
    formData.append('imagenes', imagen);

    return this.http.post(
      `${environment.baseUrlEnv}/${this.directiva}/crearProducto/`,
      formData,
      { withCredentials: true }
    );
  }

  busquedaProductosFiltrado(tipo: string, nombre: string) {
    const params = { tipo, nombre };
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/filtrarRegex/`, {
        params,
        withCredentials: true,
      })
      .pipe(
        tap((valores: any) => {
          console.log(valores), this.productos.set(valores.productos);
        })
      )
      .subscribe();
  }

  obtenerProductoId(id: number) {
    return this.http.get(
      `${environment.baseUrlEnv}/${this.directiva}/producto/` + id,
      { withCredentials: true }
    );
  }

  editarProducto(producto: Producto, imagen: File, imagenesEliminar: string[]) {
    const formData = new FormData();
    formData.append('id', producto?.id?.toString() || '');
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());
    formData.append('descripcion', producto.descripcion);
    formData.append('minimoInventario', producto.minimoInventario.toString());
    formData.append('idCategoria', producto.categoria?.id?.toString() || '');

    formData.append('idMarca', producto.marca?.id?.toString() || '');
    formData.append('imagenes', imagen);
    imagenesEliminar.forEach((imagen) => {
      formData.append('imagenesEliminar', imagen);
    });

    return this.http.put(
      `${environment.baseUrlEnv}/${this.directiva}/editarProducto/`,
      formData,
      { withCredentials: true }
    );
  }

  eliminarProducto(id: number | undefined) {
    return this.http.delete(
      `${environment.baseUrlEnv}/${this.directiva}/eliminarProducto/` + id,
      { withCredentials: true }
    );
  }
}
