import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, tap } from 'rxjs';
import { Producto, UrlImage } from 'src/app/interfaces/producto.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductosServicioService {
  readonly directiva = 'productos';
  token = this.cookie.get('token');

  //signals
  public productos = signal<Producto[]>([]);

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.ObtenerProductos();
  }

  ObtenerProductos() {
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/productos/`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      })
      .pipe(
        tap((valores: any) => {
          console.log(valores, valores.productos),
            this.productos.set(valores.productos);
        })
      )
      .subscribe();
  }

  creacionProducto(
    producto: Producto,
    imagenes: File[],
    cantidadInventario: number
  ) {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());
    formData.append('descripcion', producto.descripcion);
    formData.append('minimoInventario', producto.minimoInventario.toString());
    formData.append('idCategoria', producto.categoria?.id?.toString() || '');

    if (cantidadInventario > 0) {
      formData.append('cantidadInventario', cantidadInventario.toString());
    }

    formData.append('idMarca', producto.marca?.id?.toString() || '');

    // Agregar cada imagen al FormData
    imagenes.forEach((imagen, index) => {
      formData.append(`imagenes`, imagen);
    });

    return this.http.post(
      `${environment.baseUrlEnv}/${this.directiva}/crearProducto/`,
      formData,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  busquedaProductosFiltrado(tipo: string, nombre: string) {
    const params = { tipo, nombre };
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/filtrarRegex/`, {
        params,
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
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
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  editarProducto(producto: any, imagen: File, imagenesEliminar: string[]) {
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
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  eliminarProducto(id: number | undefined) {
    return this.http.delete(
      `${environment.baseUrlEnv}/${this.directiva}/eliminarProducto/` + id
    );
  }
}
