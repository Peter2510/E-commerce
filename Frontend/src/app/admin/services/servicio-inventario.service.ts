import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServicioInventarioService {
  readonly directiva = 'productos';

  //signals
  public productosActivos = signal<Producto[]>([]);
  public productosDesactivos = signal<Producto[]>([]);

  constructor(private http: HttpClient) {
    this.obtenerProductosActivos();
    this.obtenerProductosDesactivos();
  }

  obtenerProductosActivos() {
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/productos-activos/`, {
        withCredentials: true,
      })
      .pipe(
        tap((valores: any) => {
          console.log(valores, valores.productos),
            this.productosActivos.set(valores.productos);
        })
      )
      .subscribe();
  }
  obtenerProductosDesactivos() {
    this.http
      .get(
        `${environment.baseUrlEnv}/${this.directiva}/productos-desactivados/`,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((valores: any) => {
          console.log(valores, valores.productos),
            this.productosDesactivos.set(valores.productos);
        })
      )
      .subscribe();
  }

  cambiarEstadoProducto(id: number | undefined, estado: boolean) {
    console.log(id);

    return this.http.put(
      `${environment.baseUrlEnv}/${this.directiva}/cambiarEstadoProducto/` + id,
      { estado: estado },
      {
        withCredentials: true,
      }
    );
  }

  agregarMasProducto(id: number | undefined, cantidad: number) {
    return this.http.put(
      `${environment.baseUrlEnv}/${this.directiva}/ingresoMayorCantidadProducto/` +
        id,
      { cantidad: cantidad },
      {
        withCredentials: true,
      }
    );
  }

  //funcion para las cantidades
  obtenerCantidadesProductosInventario() {}
}
