import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductosServicioService {
  readonly directiva = 'productos';

  //signals
  public productos = signal<Producto[]>([]);

  constructor(private http: HttpClient) {}

  ObtenerProductos(cantidad: number) {
    this.http
      .get(
        `${environment.baseUrlEnv}/${this.directiva}/productosRandom/` +
          cantidad,
        { withCredentials: true }
      )
      .pipe(
        tap((valores: any) => {
          console.log(valores), this.productos.set(valores.productos);
        })
      )
      .subscribe();
  }
}
