import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { estadoinventario } from 'src/app/interfaces/inventario.interface';
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
  public estadosInventario = signal<estadoinventario[]>([]);
  token = this.cookieService.get('token');
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.obtenerProductosActivos();
    this.obtenerProductosDesactivos();
    this.obtenerEstadosInventario();
  }

  obtenerProductosActivos() {
    this.http
      .get(`${environment.baseUrlEnv}/${this.directiva}/productos-activos/`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
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
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
          ),
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
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  agregarMasProducto(id: number | undefined, cantidad: number) {
    return this.http.put(
      `${environment.baseUrlEnv}/${this.directiva}/ingresoMayorCantidadProducto/` +
        id,
      { cantidad: cantidad },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      }
    );
  }

  //funcion para las obtenerEstadosInventario
  obtenerEstadosInventario() {
    this.http
      .get(
        `${environment.baseUrlEnv}/${this.directiva}/obtenerEstadosInventario/`,
        {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.token}`
          ),
        }
      )
      .pipe(
        tap((valores: any) => {
          this.estadosInventario.set(valores.todosEstados);
        })
      )
      .subscribe();
  }

  //funcion para dar de baja a un usuario
  darBaja() {}
}
